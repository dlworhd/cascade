import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    console.log(1);
    
    if (request.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.next();
    }

    const token = request.cookies.get("sb-access-token")?.value;

    if (!token) {
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
