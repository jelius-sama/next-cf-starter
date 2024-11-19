import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/server/supabase/middleware-client";

export const runtime = "experimental-edge";

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const { response, supabase } = createMiddlewareClient(request);
    await supabase.auth.getUser();

    const headers = new Map([
        ["x-current-path", request.nextUrl.pathname],
        ["x-current-url", request.nextUrl.href],
        ["x-origin", request.nextUrl.origin],
    ]);

    headers.forEach((value, key) => {
        response.headers.set(key, value);
    });

    return response;
}

export const config = {
    matcher: [
        // Match all routes except static files and APIs
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
