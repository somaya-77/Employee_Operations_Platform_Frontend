import CompanyForm from "../../../../features/companies/components/company.form";


export default function Page() {

    return (
        <div className="bg-sidebar border border-border rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Create Company</h1>
            <p className="text-muted-foreground">
                Fill in the details below to create a new company.
            </p>

            <CompanyForm />
        </div>
    )
}