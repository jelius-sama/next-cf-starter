import { createServerClient } from "@/server/supabase/edge";
import { encodedRedirect, isString } from "@/utils";
import ErrorMessages from "@/utils/Messages";
import { ServerRuntime } from "next";
import { NextResponse } from "next/server";

export const runtime: ServerRuntime = "edge";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            return NextResponse.redirect(`/sign-up?error=${ErrorMessages.noCredentials}`);
        }

        if (!isString(email) || !isString(password)) {
            return NextResponse.redirect(`/sign-up?error=${ErrorMessages.invalidInputType({ requiredType: "string" })}`);
        }

        const supabase = createServerClient();
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error("Something went wrong during sign-up: ", error);
            return NextResponse.redirect(`/sign-up?error=${error.message}`);
        }

        // Success response
        return NextResponse.json({
            user: data.user,
            session: data.session,
        });
    } catch (error) {
        console.error("Unhandled error during sign-up: ", error);
        return NextResponse.redirect(`/sign-up?error=${"An unexpected error occurred."}`);
    }
}
