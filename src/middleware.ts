import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/auth") || request.nextUrl.pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    const supabase = await createClient();
    const session = supabase.auth.getSession()

    if (!session) {
        return NextResponse.redirect(new URL("/auth", request.url));
    }

    return NextResponse.next();
}

// 적용하고자 하는 경로 작성
export const config = {
    matcher: [
        '/dashboard/:path*' //대시보드 및 하위 경로에만 적용
    ],
};
