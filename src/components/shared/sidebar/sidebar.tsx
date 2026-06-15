import { getServerSession } from "next-auth";
import SidebarContent from "./sidebar-content";
import { authOptions } from "@/auth";



export default async function Sidebar() {
    const session = await getServerSession(authOptions);


    return (<SidebarContent role={session?.user.role} />);
};