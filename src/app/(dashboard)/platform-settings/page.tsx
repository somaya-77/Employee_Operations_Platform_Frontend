
"use client"
import { Save, Shield, CheckCircle } from "lucide-react"
import { CATEGORIES, FIELD_CONFIG } from "@/lib/constance/dashboard";
import { UsePlatformSettingsHook } from "@/hooks/use-platform-settings.hook";


export default function SettingsPage() {

    const { loading, hasChanges, saving, success, handleSave, settings, changed, setValue } = UsePlatformSettingsHook()

    if (loading) {
        return (
            <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
                Loading settings...
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Platform Settings</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage PeopleFlow configurations</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={!hasChanges || saving}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {success && (
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg px-4 py-3 text-sm">
                    <CheckCircle className="w-4 h-4" /> {success}
                </div>
            )}

            {hasChanges && (
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg px-4 py-3 text-sm">
                    <Shield className="w-4 h-4" />
                    You have unsaved changes
                </div>
            )}

            {/* Categories */}
            {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                const catKeys = cat.keys.filter((k) => k in FIELD_CONFIG)

                return (
                    <section key={cat.key} className="rounded-xl border border-border bg-sidebar overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-muted/20">
                            <Icon className="w-4 h-4 text-muted-foreground" />
                            <h2 className="text-sm font-medium">{cat.label}</h2>
                        </div>
                        <div className="divide-y divide-border">
                            {catKeys.map((key) => {
                                const cfg = FIELD_CONFIG[key]
                                const val = settings[key] ?? ""
                                const isDirty = changed(key)

                                return (
                                    <div key={key} className={`flex items-center gap-4 px-5 py-4 transition-colors ${isDirty ? "bg-primary/3" : ""}`}>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium">{cfg.label}</p>
                                                {isDirty && (
                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                                        Modified
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {cfg.type === "toggle" ? (
                                            // Toggle switch
                                            <button
                                                onClick={() => setValue(key, val === "true" ? "false" : "true")}
                                                className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${val === "true" ? "bg-primary" : "bg-muted"
                                                    }`}
                                            >
                                                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${val === "true" ? "translate-x-6" : "translate-x-1"
                                                    }`} />
                                            </button>
                                        ) : (
                                            <input
                                                type={cfg.type}
                                                value={val}
                                                onChange={(e) => setValue(key, e.target.value)}
                                                placeholder={cfg.placeholder}
                                                className={`w-56 border rounded-lg bg-background px-3 py-2 text-sm outline-none transition shrink-0 ${isDirty
                                                        ? "border-primary focus:border-primary"
                                                        : "border-border focus:border-primary"
                                                    }`}
                                            />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}
