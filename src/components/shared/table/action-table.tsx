"use client";

// Imports
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export default function ActionTable({ handleUpdate, id, onDelete }: { handleUpdate: ({ id }: { id: string; }) => void; id: string; onDelete: (id: string) => Promise<any> }) {

    // Handle delete item
    const handleDelete = async (id: string) => {
        const result = await onDelete(id);
        console.log("Result", result)
        if (result?.success) {
            toast.success("Company deleted successfully");
        } else {
            toast.error("Failed to delete company");
        }
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

                    // onClick={handleUpdate}
                    >
                        <Edit className="mr-2 h-4 w-4 text-green-600" />
                        <span>Edit</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    {/* Delete item */}
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer hover:bg-sidebar-primary/50"
                        onClick={() => handleDelete(id)}
                    >
                        <Trash2Icon className="mr-2 h-4 w-4 text-red-600" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}