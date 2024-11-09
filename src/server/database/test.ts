"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";

export default async function testDatabase() {
    try {
        const db = getRequestContext().env.DB; // This is the binding name you set earlier
        const result = db.prepare('SELECT * FROM test').all();
        return result;
    } catch (error) {
        console.error("Database api error: ", error);
        return { error: "Failed to fetch data", details: (error as Error).message };
    }
}