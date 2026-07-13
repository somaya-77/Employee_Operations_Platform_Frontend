"use client";

// Imports
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchHook } from "@/hooks/use-search.hook";

export default function SearchInput({ path }: { path: string }) {
    const { handleSearch, setValue, value } = useSearchHook(path)

    return (
        <form className="relative w-1/2">
            {/* Search icon */}
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

            {/* Input search */}
            <Input
                placeholder="Search..."
                className="pl-9"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    handleSearch(e.target.value);
                }}
            />
        </form>
    )
}