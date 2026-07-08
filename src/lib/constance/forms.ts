import { TypeForm } from "@/types";

export const loginInputs = [
    { id: 1, label: "Email", type: "text", name: "email" },
    { id: 2, label: "Password", type: "password", name: "password" },
];


export const accountsBtn = [
    { label: "Login as Super Admin", email: "super@empops.io", password: "SuperAdmin@2026!" },
    { label: "Login as Company Admin", email: "company@vive.io", password: "CompanyAdmin@2026!" },
    // { label: "Login as Super Manager", email: "manager@empops.io", password: "Manager@2026!" },
    // { label: "Login as Super Employee", email: "employee@empops.io", password: "Employee@2026!" },
];




export const companyInputs: TypeForm[] = [
    { id: 1, label: "Company name", type: "text", name: "company_name", placeholder: "ex- Vive" },
    { id: 2, label: "Company domain", type: "text", name: "company_domain", placeholder: "ex- https://vive.com" },
    { id: 3, label: "Admin first name", type: "text", name: "admin_first_name", placeholder: "ex- Somaya" },
    { id: 4, label: "Admin last name", type: "text", name: "admin_last_name", placeholder: "ex- Elkhateeb" },
    { id: 5, label: "Admin email", type: "text", name: "admin_email", placeholder: "ex- admin@vive.com" },
    { id: 6, label: "Admin password", type: "password", name:"admin_password", placeholder: "ex- Admin@2026!" },
];


