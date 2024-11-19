import { title } from "@/components/primitives";
import MarginedContent from "@/components/ui/margined-content";
import { SubmitButton } from "@/components/ui/submit-button";
import { createServerClient } from "@/server/supabase/edge";
import getUserOrRedirect from "@/utils/get-user";
import type { Metadata, ServerRuntime } from "next";
import Image from "next/image";

export const runtime: ServerRuntime = "edge";

export const metadata: Metadata = {
    title: "Profile"
};

export default async function ProfilePage() {
    const { user } = await getUserOrRedirect({ redirectTo: 'sign-in' });

    return (
        <MarginedContent>
            <div className="flex items-center justify-center flex-col flex-nowrap gap-y-4 pb-4">
                {user.user_metadata.banner_url ? (
                    <Image
                        alt={user.user_metadata.user_name}
                        className="rounded-md aspect-[10/4] md:aspect-[10/3] lg:aspect-[10/2] w-screen object-cover"
                        height={576}
                        src={user.user_metadata.banner_url}
                        width={1024}
                    />
                ) : (
                    <Image
                        alt={user.user_metadata.user_name}
                        aria-describedby="https://x.com/ArmandoValores/status/1840576801208434758"
                        aria-labelledby="Yumeko Shikiya (志喜屋 夢子, Shikiya Yumeko)"
                        className="rounded-md aspect-[10/4] md:aspect-[10/3] lg:aspect-[10/2] w-screen object-cover"
                        height={576}
                        src={"/assets/default-banner.JPG"}
                        width={1024}
                    />
                )}

                <div className="w-full flex flex-row flex-nowrap items-center justify-start gap-x-2">
                    {user.user_metadata.avatar_url ? (
                        <Image
                            alt={user.user_metadata.user_name}
                            className="rounded-full w-[30%] h-[30%] max-w-[200px] max-h-[200px] object-cover aspect-square"
                            height={300}
                            src={user.user_metadata.avatar_url}
                            width={300}
                        />
                    ) : (
                        <Image
                            alt={user.user_metadata.user_name}
                            aria-labelledby="Chinatsu Kano (鹿野 千夏 Kano Chinatsu)"
                            className="rounded-full w-[30%] h-[30%] max-w-[200px] max-h-[200px] object-cover aspect-square"
                            height={300}
                            src={"/assets/default-profile.png"}
                            width={300}
                        />
                    )}

                    <p className={title({ size: "sm", fullWidth: true })}>
                        {user.user_metadata.user_name}
                    </p>
                </div>
            </div>

            <div className="w-full items-center flex flex-col justify-center gap-y-2 pt-4">
                {/* {error && (
              <Snippet hideCopyButton hideSymbol color="danger" radius="sm">
                {error}
              </Snippet>
            )} */}

                <form>
                    <SubmitButton
                        formAction={async () => {
                            "use server";
                            const supabase = createServerClient();
                            await supabase.auth.signOut();
                        }}
                    >
                        Logout
                    </SubmitButton>
                </form>
            </div>
        </MarginedContent>
    );
}
