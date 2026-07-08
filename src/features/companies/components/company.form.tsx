"use client";

// Imports
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { companyInputs } from "@/lib/constance/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import TypeInputs from "@/components/shared/forms/type-inputs";
import { createCompanyAction } from "@/features/companies/actions/post-company.action";
import { CompanyDefaultValue, CompanySchema, CompanySchemaType } from "../schemas/company.schema";

export default function CompanyForm() {
    // navigate
    const router = useRouter();

    // form
    const form = useForm<CompanySchemaType>({
        resolver: zodResolver(CompanySchema),
        defaultValues: CompanyDefaultValue,
        mode: "onChange",
    });

    // handle submit
    const handleSubmit = async (data: CompanySchemaType) => {
        const result = await createCompanyAction(data);

        if (result.success) {
            toast.success("Company created successfully!");
            router.push("/companies");
            router.refresh();
        } else {
            toast.error(result.message || "Failed to create company");
        }
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 my-8">
                {companyInputs.map(item => (
                    <div key={item.id} className="w-full ">
                        <TypeInputs form={form}
                            type={item.type}
                            label={item.label}
                            placeholder={item.placeholder}
                            name={item.name as "company_name" | "company_domain" | "admin_first_name" | "admin_last_name" | "admin_email" | "admin_password"}
                        />
                    </div>
                ))}
            </div>


            <Button
                isLoading={form.formState.isSubmitting}
                type="submit" className="w-full mt-6">Create Company</Button>
        </form>
    )
}