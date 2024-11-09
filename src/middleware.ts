import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/server/auth/middleware";

export const runtime = "experimental-edge";

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const headers = new Headers(request.headers);
    headers.set("x-origin", request.nextUrl.origin);

    // Check and update session if it exists
    const sessionResponse = await updateSession(request);
    if (sessionResponse) {
        // Merge headers into the session response
        sessionResponse.headers.set("x-origin", request.nextUrl.origin);
        return sessionResponse;
    }

    // Proceed with request when no session exists
    return NextResponse.next({ headers });
}

export const config = {
    matcher: [
        // Match all routes except static files and APIs
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
