import { useEffect, useState } from "react"



export function UsePlatformSettingsHook() {
    const [settings, setSettings] = useState<Record<string, string>>({})
    const [original, setOriginal] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState("")

    useEffect(() => { fetchSettings() }, [])

    async function fetchSettings() {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/super-admin/settings`,
                { credentials: "include" })
            const json = await res.json()
            setSettings(json.data.asObject)
            setOriginal(json.data.asObject)
        } finally { setLoading(false) }
    }

    function changed(key: string) {
        return settings[key] !== original[key]
    }

    const hasChanges = Object.keys(settings).some(changed)

    async function handleSave() {
        setSaving(true)
        try {
            const updates = Object.entries(settings)
                .filter(([key]) => changed(key))
                .map(([key, value]) => ({ key, value }))

            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/super-admin/settings/bulk`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ updates }),
            })

            setOriginal({ ...settings })
            setSuccess(`Successfully saved ${updates.length} setting(s)`)
            setTimeout(() => setSuccess(""), 3000)
        } finally { setSaving(false) }
    }

    function setValue(key: string, value: string) {
        setSettings((prev) => ({ ...prev, [key]: value }))
    }
    return { loading, hasChanges, saving, success, handleSave, settings, changed, setValue }
}