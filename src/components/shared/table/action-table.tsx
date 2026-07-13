"use client";

// Imports
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
    onEdit: string;
    onDelete: (id: string) => Promise<any>
}

export default function ActionTable({ onEdit, id, onDelete }: Props) {
    // Router
    const router = useRouter();
    // Handle delete item
    const handleDelete = async (id: string) => {
        const result = await onDelete(id);

        if (result?.success) {
            toast.success("Company deleted successfully");
        } else {
            toast.error("Failed to delete company");
        }
    };

    // Handle update item
    const handleUpdate = async (id: string) => {
        router.push(`${onEdit}/${id}`)
    };

    return (
        <DropdownMenu>
            {/* Trigger */}
            <DropdownMenuTrigger render={
                <button className="p-2 hover:bg-accent rounded-md cursor-pointer">
                    <MoreVertical size={16} />
                </button>
            } />
            {/* Content */}
            <DropdownMenuContent align="end" className="w-48 bg-sidebar">
                <DropdownMenuGroup>
                    {/* Edit item */}
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer hover:bg-sidebar-primary/50"
                        onClick={() => handleUpdate(id)}
                    >
                        <Edit className="mr-1.5 h-4 w-4 text-green-600" />
                        <span>Edit</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    {/* Delete item */}
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer hover:bg-sidebar-primary/50"
                        onClick={() => handleDelete(id)}
                    >
                        <Trash2Icon className="mr-1.5 h-4 w-4 text-red-600" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}