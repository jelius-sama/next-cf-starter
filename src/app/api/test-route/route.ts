import { ServerRuntime } from "next";

export const runtime: ServerRuntime = "edge";

export async function GET() {
    return new Response('Hello from Kazuma-kun the Developer of this project.', {
        status: 200,
    });
}