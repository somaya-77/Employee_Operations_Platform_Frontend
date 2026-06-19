"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function HeaderCompanies() {
    const searchParams = useSearchParams();
  const { replace } = useRouter();

const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term); 
    } else {
      params.delete("query");
    }
    replace(`/companies?${params.toString()}`);
  }, 500);
    return (
        <div className="flex items-center justify-between">
            {/* Input search */}
            <div className="relative w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search companies..."
          className="pl-9"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>

            <Button>
                <Link
                    href="/companies/create-company"
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
                >
                    <PlusCircleIcon className="w-4 h-4" />
                    New Company
                </Link>
            </Button>
        </div>
    )
}