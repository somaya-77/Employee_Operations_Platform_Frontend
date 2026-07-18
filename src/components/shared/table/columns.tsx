import ActionTable from "./action-table";
import { Company } from "@/types/dashboard.types";
import { STATUS } from "@/lib/constance/dashboard";
import { ColumnDef } from "@/components/shared/table/data-table";
import { deleteCompanyAction } from "@/features/companies/actions/delete-company.action";

// columns company
export const CompanyColumns: ColumnDef<Company>[] = [
    {
        header: "Company",
        accessorKey: "name",
        cell: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
        header: "Users",
        accessorKey: "user_count",
        cell: (row) => <span className="text-muted-foreground">{row.user_count.toLocaleString("en-US")}</span>,
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
    {
        header: "Actions",
        accessorKey: "actions",
        cell: (row) => <ActionTable editPath="/companies/edit-company" id={row.id} onDelete={deleteCompanyAction}/>
    },
]