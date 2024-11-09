import AuthInput from "@/components/layout/auth-input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SubmitButton } from "@/components/ui/submit-button";
import { getSession, signIn } from "@/server/auth";
import { AlertCircle } from "lucide-react";
import { Metadata, ServerRuntime } from "next";
import { redirect } from "next/navigation";

export const runtime: ServerRuntime = 'edge';

export const metadata: Metadata = {
    title: "Sign in"
};

export default async function SignInPage(props: { searchParams: Promise<{ error: string; } | null>; }) {
    const searchParams = await props.searchParams;
    const { user } = await getSession();
    if (user) redirect('/profile');

    return (
        <section className="flex w-full h-[calc(100vh_-_62px)] items-center justify-center">
            <form
                className="flex flex-col w-full max-w-[calc(28rem_+_4rem)] gap-x-1.5 gap-y-4 p-5 border rounded-md"
                action={async (formData) => {
                    "use server";
                    const { error } = await signIn(formData);
                    if (error === null) redirect("/profile");
                    if (error !== null) redirect(`/sign-in?error=${error}`);
                }}
            >
                <p className="font-bold text-lg">Sign in</p>
                {searchParams && searchParams.error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {searchParams.error}
                        </AlertDescription>
                    </Alert>
                )}
                <AuthInput context="sign-in" />
                <SubmitButton type="submit">Sign in</SubmitButton>
            </form>
        </section>
    );
}