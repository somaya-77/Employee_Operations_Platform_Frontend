"use client";

// Imports
import { Company } from "@/types/dashboard.types";
import { STATUS } from "@/lib/constance/dashboard";
import DataTable, { ColumnDef } from "@/components/shared/data-table";

// columns company
const columns: ColumnDef<Company>[] = [
  {
    header: "Company",
    accessorKey: "name",
    cell: (row) => <span className="font-medium">{row.name}</span>,
  },
  {
    header: "Users",
    accessorKey: "user_count",
    cell: (row) => <span className="text-muted-foreground">{row.user_count.toLocaleString()}</span>,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => {
      const st = STATUS[row.status as keyof typeof STATUS] ?? STATUS.active
      const Icon = st.icon
      return (
        <span className={`flex items-center gap-1.5 w-fit ${st.cls}`}>
          <Icon className="w-3.5 h-3.5" />
          <span className="text-xs">{st.label}</span>
        </span>
      )
    },
  },
  {
    header: "Created At",
    accessorKey: "created_at",
    cell: (row) => (
      <span className="text-xs text-muted-foreground">
        {new Date(row.created_at).toLocaleDateString("en-US", {
          day: "numeric", month: "short", year: "numeric",
        })}
      </span>
    ),
  },
]

export default function TopCompanies({ companies }: { companies: Company[] }) {
  return <DataTable data={companies} columns={columns} emptyMessage="No companies yet" />
}