import { getRequestContext } from "@cloudflare/next-on-pages";
import { ServerRuntime } from "next";
import { NextResponse } from "next/server";

export const runtime: ServerRuntime = "edge";

export async function GET() {
    try {
        const { env } = getRequestContext();

        const { results } = await env.DB.prepare('SELECT * FROM test').all();
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        // Handle any potential errors gracefully
        console.error("Database api error: ", error);

        return NextResponse.json(
            { error: "Failed to fetch data", details: (error as Error).message },
            { status: 500 }
        );
    }
}