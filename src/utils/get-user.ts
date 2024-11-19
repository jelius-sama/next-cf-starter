import { User } from "@/components/atoms";
import { createServerClient } from "@/server/supabase/edge";
import { UserMetadata } from "@/types";
import { redirect, RedirectType } from "next/navigation";

type GetUserOrRedirectReturn<T extends 'home' | 'sign-in'> =
    T extends 'sign-in'
    ? { user: User; }
    : never;

export default async function getUserOrRedirect<T extends 'home' | 'sign-in'>({ redirectTo }: { redirectTo: T; }): Promise<GetUserOrRedirectReturn<T>> {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (redirectTo === 'home') {
        if (user) {
            redirect('/', RedirectType.replace);
        }
        return undefined as unknown as GetUserOrRedirectReturn<T>; // Explicitly return for `home`
    }

    if (redirectTo === 'sign-in') {
        if (!user) {
            redirect('/sign-in', RedirectType.replace);
        }
        return {
            user: {
                ...user!,
                user_metadata: user.user_metadata as UserMetadata,
            },
        } as GetUserOrRedirectReturn<T>;
    }

    throw new Error("Unhandled redirectTo value");
}
