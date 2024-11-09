"use server";

import { cookies } from "next/headers";
import { decrypt, encrypt } from "@/server/auth/jwt";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { validateEmail } from "@/server/utils";
import { expires } from "@/server/utils";
import bcrypt from "bcrypt-edge";
import { isString } from "@/lib/utils";

export interface User {
    id: number;
    email: string;
    username: string;
    created_at: string;
}

export interface JwtPayload {
    expires: string; // ISO 8601 date string
    iat: number;     // Issued at timestamp (in seconds)
    exp: number;     // Expiration timestamp (in seconds)
}

export interface Session extends JwtPayload {
    user: User;
}

export async function signIn(formData: FormData): Promise<{ error: string; } | { error: null; }> {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) return { error: "Email and password are required" };

        if (!isString(email)) return { error: "Failed to parse email!" };
        if (!isString(password)) return { error: "Failed to parse password!" };

        if (!validateEmail(email)) return { error: "Invalid email format" };

        // Access the D1 database using environment binding
        const { env } = getRequestContext();
        const db = env.DB;  // DB is the environment binding name configured in wrangler.toml

        // Retrieve user from D1 database
        const user = await db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();

        if (!user) {
            return { error: "User not found, please sign up first!" };
        }

        // Check password against the stored hash
        const isValidPassword = bcrypt.compareSync(password, user.password as string);
        if (!isValidPassword) {
            return { error: "Invalid password or email." }; // Here "or email." is to not give out exactly what's incorrect for better security. 
        }

        // Create session (JWT)
        const session = await encrypt({ user: user, expires });

        // Save session in cookie
        cookies().set("session", session, { expires, httpOnly: true });
        return { error: null };
    } catch (error) {
        console.error("Sign-in error:", error);
        return { error: (error as Error).message };
    }
}

export async function signUp(formData: FormData): Promise<{ error: string; } | { error: null; }> {
    try {
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirm-password");
        const username = formData.get("username");

        if (!email || !password || !username || !confirmPassword) return { error: "All fields are required" };

        if (!isString(email)) return { error: "Failed to parse email!" };
        if (!isString(password)) return { error: "Failed to parse password!" };
        if (!isString(confirmPassword)) return { error: "Failed to parse confirm password!" };
        if (!isString(username)) return { error: "Failed to parse username!" };

        if (!validateEmail(email)) return { error: "Invalid email!" };
        if (confirmPassword !== password) return { error: "Passwords don't match!" };

        // Access the D1 database using environment binding
        const { env } = getRequestContext();
        const db = env.DB;  // DB is the environment binding name configured in wrangler.toml

        // Check if the user already exists in D1 database
        const existingUser = await db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
        if (existingUser) {
            return { error: "Email is already registered" };
        }

        // Hash the password before storing it
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insert the new user into D1 database and then fetch it
        await db.prepare('INSERT INTO users (email, password, username) VALUES (?, ?, ?)').bind(email, hashedPassword, username).run();
        const user = await db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first() as User | null;

        if (!user) {
            return { error: "Something went wrong in the database!" };
        }

        // Create session (JWT) for the new user
        const session = await encrypt({ user: user, expires });

        // Save session in cookie
        cookies().set("session", session, { expires, httpOnly: true });
        return { error: null };
    } catch (error) {
        console.error("Sign-up error:", error);
        return { error: "Failed to sign up, please try again" };
    }
}

export async function logout() {
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession(): Promise<{ jwtPayload: JwtPayload | null, user: User | null; }> {
    const session = cookies().get("session")?.value;

    if (!session) return { jwtPayload: null, user: null };

    const decryptedSession = await decrypt(session) as Session;
    const { user, ...jwtPayload } = decryptedSession;

    return { jwtPayload: jwtPayload || null, user: user || null };
}