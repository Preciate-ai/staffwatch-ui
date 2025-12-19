import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookieKey } from "./stores/auth.store";


export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get(cookieKey)?.value;

    // Check if the user is accessing a protected route
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        if (!accessToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
