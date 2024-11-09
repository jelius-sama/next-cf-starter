import { Metadata, ServerRuntime } from "next";
import { headers } from "next/headers";

export const runtime: ServerRuntime = "edge";

export const metadata: Metadata = {
    title: "Settings"
};

export default async function SettingsPage() {
    const headerLists = headers();
    const origin = headerLists.get("x-origin");

    if (!origin) return (
        <div>
            <p>Settings Page - Error</p>
            <p>Origin not found - Could not make fetch request to API.</p>
            <p>Possible cause of error: `@/src/metadata.ts` file is not functioning as expected in &quot;edge&quot; runtime.</p>
        </div>
    );

    const testApiRoute = await fetch(`${origin}/api/test-route`);
    const testApiResponse = await testApiRoute.text();

    return (
        <div>
            <p>Settings Page</p>
            <p>{testApiResponse}</p>
        </div>
    );
}