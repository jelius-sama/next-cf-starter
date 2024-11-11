import AuthInput from "@/components/layout/auth-input";
import { cssVars } from "@/app.config";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import MarginedContent from "@/components/ui/margined-content";
import { SubmitButton } from "@/components/ui/submit-button";
import { getSession, signUp } from "@/server/auth";
import { AlertCircle } from "lucide-react";
import { Metadata, ServerRuntime } from "next";
import { redirect, RedirectType } from "next/navigation";
import Link from "next/link";

export const runtime: ServerRuntime = 'edge';

export const metadata: Metadata = {
    title: "Sign up"
};

export default async function SignUpPage(props: { searchParams: Promise<{ error: string; } | null>; }) {
    const searchParams = await props.searchParams;
    const { user } = await getSession();

    if (user) redirect('/profile', RedirectType.replace);

    return (
        <MarginedContent style={{ height: `calc(100vh - ${(cssVars.marginPx * 2) + cssVars.headerPx}px)` }} className={`flex flex-col items-center justify-center`}>
            <form
                className="flex flex-col w-full max-w-[calc(28rem_+_4rem)] gap-x-1.5 gap-y-4 p-5 border rounded-md"
                action={async (formData) => {
                    "use server";
                    const { error } = await signUp(formData);
                    if (error === null) redirect("/profile", RedirectType.replace);
                    if (error !== null) redirect(`/sign-up?error=${error}`, RedirectType.replace);
                }}
            >
                <p className="font-bold text-lg">Sign up</p>
                {searchParams && searchParams.error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {searchParams.error}
                        </AlertDescription>
                    </Alert>
                )}
                <AuthInput context="sign-up" />
                <SubmitButton type="submit">Sign up</SubmitButton>
            </form>

            <span className="flex flex-row gap-x-1 w-full justify-center items-center mt-4">
                <p>Already have an account?</p>
                <Link href={'/sign-in'} className="text-blue-600 transition-all duration-300 hover:opacity-90">Sign in</Link>
            </span>
        </MarginedContent>
    );
}