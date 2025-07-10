import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const supabase = await createClient();

        const code = new URL(req.url).searchParams.get("code") || "";
        const { data, error } = await supabase.auth.exchangeCodeForSession(
            code
        );

        if (error) {
            return NextResponse.redirect(new URL("/auth", req.url));
        }

        return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch (error) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }
}
