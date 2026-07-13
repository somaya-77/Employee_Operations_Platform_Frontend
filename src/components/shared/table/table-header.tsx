"use client";

import SearchInput from "@/components/shared/table/search-input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

import Link from "next/link";

export interface CustomTableHeaderProps {
  path?: string;
  href?: string;
  textBtn?:string;
}

export default function CustomTableHeader({path = "", href="#", textBtn=""}: CustomTableHeaderProps) {

  if(!path) return null;
  return (
    <div className="flex items-center justify-between">
      {/* Search input */}
      <SearchInput path={path} />

      <Button>
        <Link
          href={href}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
        >
          <PlusCircleIcon className="w-4 h-4" />
          {textBtn}
        </Link>
      </Button>
    </div>
  )
}