"use client";

import { MoreVertical, User, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function ProfileMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <button className="p-2 hover:bg-accent rounded-md cursor-pointer">
                    <MoreVertical size={16} />
                </button>
            } />

            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        render={
                            <Link href="/profile" className="flex items-center gap-2 flex-1 cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        }
                    />

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}