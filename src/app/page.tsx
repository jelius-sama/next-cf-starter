import TestComponent from "@/components/test";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSession } from "@/server/auth";
import { Metadata, ServerRuntime } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home"
};

export const runtime: ServerRuntime = 'edge';

export default async function HomePage() {
  const { user } = await getSession();

  return (
    <div>
      <ThemeToggle />
      <p>Hello, World!</p>
      <div className="flex gap-x-2">
        {user ? (
          <Link className="text-blue-600" href={'/profile'}>Profile</Link>
        ) : (
          <>
            <Link className="text-blue-600" href={'/sign-in'}>Sign In</Link>
            <p>|</p>
            <Link className="text-blue-600" href={'/sign-up'}>Sign Up</Link>
          </>
        )}
      </div>
      <TestComponent />
    </div>
  );
}
