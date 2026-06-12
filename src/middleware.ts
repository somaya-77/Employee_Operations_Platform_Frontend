import { NextRequest, NextResponse } from "next/server";




export default function Middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const segments = pathname.split("/");

    if (segments) {

        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
}