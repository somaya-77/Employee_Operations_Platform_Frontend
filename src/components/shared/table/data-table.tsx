"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export interface ColumnDef<T> {
    header: string
    accessorKey: keyof T | "actions"
    cell?: (row: T) => React.ReactNode
}

interface GenericTableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
    emptyMessage?: string
}

export default function DataTable<T extends { id?: string }>({ data, columns, emptyMessage = "No data found" }: GenericTableProps<T>) {
    if (!data.length) {
        return <p className=" text-muted-foreground text-center py-6">{emptyMessage}</p>
    }

    return (
        <div className="overflow-y-auto border border-border rounded-md max-h-[80%]">
            <Table className="w-full ">
                <TableHeader>
                    <TableRow className="border-b border-border bg-background">
                        {columns.map((col) => (
                            <TableHead key={col.header}>
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-border">
                    {data.map((row, index) => (
                        <TableRow key={row.id ?? index} className=" transition-colors hover:bg-border/50">
                            {columns.map((col) => (
                                <TableCell key={col.header} className="py-3">
                                    {col.cell
                                        ? col.cell(row)
                                        : col.accessorKey !== "actions"
                                            ? String(row[col.accessorKey as keyof T] ?? "")
                                            : null
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

