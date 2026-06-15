"use client"
// components/superadmin/TopCompanies.tsx
import { CheckCircle2, XCircle, Clock } from "lucide-react"

interface Company {
  id:         string
  name:       string
  status:     string
  user_count: number
  created_at: string
}

interface Props { companies: Company[] }

const STATUS = {
  active:    { label: "نشطة",   icon: CheckCircle2, cls: "text-emerald-500" },
  suspended: { label: "موقوفة", icon: XCircle,      cls: "text-rose-500"    },
  trial:     { label: "تجريبي", icon: Clock,        cls: "text-amber-500"   },
}

export default function TopCompanies({ companies }: Props) {
  return (
    <div className="overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-right text-xs font-medium text-muted-foreground pb-3">الشركة</th>
            <th className="text-right text-xs font-medium text-muted-foreground pb-3">المستخدمون</th>
            <th className="text-right text-xs font-medium text-muted-foreground pb-3">الحالة</th>
            <th className="text-right text-xs font-medium text-muted-foreground pb-3">تاريخ الإنشاء</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {companies.map((c) => {
            const st   = STATUS[c.status as keyof typeof STATUS] ?? STATUS.active
            const Icon = st.icon
            const date = new Date(c.created_at).toLocaleDateString("ar-EG", {
              day: "numeric", month: "short", year: "numeric",
            })
            return (
              <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-3 font-medium">{c.name}</td>
                <td className="py-3 text-muted-foreground">{c.user_count.toLocaleString()}</td>
                <td className="py-3">
                  <span className={`flex items-center gap-1.5 w-fit ${st.cls}`}>
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-xs">{st.label}</span>
                  </span>
                </td>
                <td className="py-3 text-xs text-muted-foreground">{date}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
