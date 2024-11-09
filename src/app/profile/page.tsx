import { Button } from "@/components/ui/button";
import { getSession, logout } from "@/server/auth";
import testServerFunction from "@/server/function/test";
import { Metadata, ServerRuntime } from "next";
import { redirect } from "next/navigation";

export const runtime: ServerRuntime = 'edge';

export const metadata: Metadata = {
    title: "Profile"
};

export default async function ProfilePage() {
    const greeting = await testServerFunction({ props: { firstName: "Kazuma", honarific: "kun" } });
    const { user } = await getSession();
    if (!user) redirect('/sign-in');

    return (
        <div>
            <p>Profile Page</p>
            <p>{greeting}</p>

            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Created at: {user.created_at}</p>
            <form
                action={async () => {
                    "use server";
                    await logout();
                    redirect("/sign-in");
                }}
            >
                <Button type="submit">Logout</Button>
            </form>
        </div>
    );
}
