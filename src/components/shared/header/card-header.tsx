"use client"

// Imports
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Type
type Props = {
    title: string;
    icon?: React.ReactNode;
    titleBtn: string;
    iconBtn?: React.ReactNode;
    link: string
};

export default function CardHeader({ title, icon, iconBtn= <ArrowRight size={16} />, titleBtn, link }: Props) {

    return (
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
                {icon}
                <h2 className="font-medium">{title}</h2>
            </div>
            <Button>
                <Link
                    href={link}
                    className="text-sm flex items-center gap-2"
                >
                    {titleBtn} {iconBtn}
                </Link>
            </Button>
        </div>
    )
}