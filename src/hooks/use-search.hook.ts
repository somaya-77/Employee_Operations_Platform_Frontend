"use client";

// Imports
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";

export const useSearchHook = (path: string) => {
    // Search params
    const searchParams = useSearchParams();

    // State 
    const [value, setValue] = useState(searchParams.get("query") || "");

    // Router
    const { replace } = useRouter();

    // Effect
    useEffect(() => {
        setValue(searchParams.get("query") || "");
    }, [searchParams]);

    // Handle Search
    const handleSearch = useDebouncedCallback((term: string) => {

        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${path}?${params.toString()}`);

    }, 500);

    return { handleSearch, defaultValue: searchParams.get("query")?.toString(), value, setValue };
}