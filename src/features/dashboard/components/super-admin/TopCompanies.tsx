"use client";

// Imports
import { Company } from "@/types/dashboard.types";
import DataTable from "@/components/shared/table/data-table";
import { CompanyColumns } from "@/components/shared/table/columns";
import CustomTableHeader, { CustomTableHeaderProps } from "@/components/shared/table/table-header";


interface Props extends CustomTableHeaderProps {
  companies: Company[]
}
export default function TopCompanies({ companies, path, href, textBtn }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <CustomTableHeader path={path} href={href} textBtn={textBtn} />
      <DataTable data={companies} columns={CompanyColumns} emptyMessage="No companies yet"  />
    </div>
  )
}