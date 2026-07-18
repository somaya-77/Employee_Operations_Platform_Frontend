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
import { showCompanyAction } from "../actions/show-company.action";
import { useEffect } from "react";
import { updateCompanyAction } from "../actions/update-company.action";

export default function CompanyForm({ id }: { id?: string }) {
    // navigate
    const router = useRouter();

    // form
    const form = useForm<CompanySchemaType>({
        resolver: zodResolver(CompanySchema),
        defaultValues: CompanyDefaultValue,
        mode: "onChange",
    });



    // edit data
    useEffect(() => {
        if (id) {
            // fetch company data by id
            showCompanyAction(id).then((response) => {
                const company = response.data;
                const admin = company.users?.[0];

                form.reset({
                    company_name: company.name || "",
                    company_domain: company.domain || "",
                    admin_first_name: admin?.first_name || "",
                    admin_last_name: admin?.last_name || "",
                    admin_email: admin?.email || "",
                });
            })
        }
    }, [id, form])


    // handle submit
    const handleSubmit = async (data: CompanySchemaType) => {
        let result;
        if (id) {
            result = await updateCompanyAction(id, data);
        } else {
            result = await createCompanyAction(data);
        }

        if (result?.success) {
            toast.success(id ? "Company updated successfully!" : "Company created successfully!");
            router.push("/companies");
            router.refresh();
        } else {
            toast.error(result?.message || "Something went wrong");
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
                type="submit" className="w-full mt-6">{id ? "Update Company" : "Create Company"}</Button>
        </form>
    )
}