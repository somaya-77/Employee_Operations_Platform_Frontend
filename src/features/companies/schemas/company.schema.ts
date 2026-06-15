import { z } from "zod";

export const CompanySchema = z.object({
    company_name: z.string().min(1, "Company name is required"),
    company_domain: z.string(),
    admin_first_name: z.string().min(1, "Admin first name is required"),
    admin_last_name: z.string(),
    admin_email: z.string().min(1, "Email is required"),
    admin_password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/,
            "Password must contain uppercase, lowercase, number, and special character"
        ),
});

export const CompanyDefaultValue = {
    company_name: "",
    company_domain: "",
    admin_first_name: "",
    admin_last_name: "",
    admin_email: "",
    admin_password: "",
};

export type CompanySchemaType = z.infer<typeof CompanySchema>;