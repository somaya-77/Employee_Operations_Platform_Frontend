import CompanyForm from "../../../../../features/companies/components/company.form";


export default function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
return <div>show </div>
    return (
        <div className="bg-sidebar border border-border rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Edit company</h1>
            <p className="text-muted-foreground">
                Fill in the details below to update a company.
            </p>

            <CompanyForm />
        </div>
    )
}