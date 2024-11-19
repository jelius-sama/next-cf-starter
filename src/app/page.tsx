import MarginedContent from "@/components/ui/margined-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home"
};

export default function HomePage() {

  return (
    <MarginedContent>
      <section className="w-full h-full flex flex-row gap-x-6 fixed">
        <p>Hello, World!</p>
      </section>
    </MarginedContent>
  );
}
