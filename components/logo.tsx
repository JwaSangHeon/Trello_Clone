import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/font.ttf",
});

export const Logo = () => {
  return (
    <Link href="/">
      <div
        className="
        hover:opacity-75
        transition
        items-center
        gap-x-2
        hidden
        md:flex
      "
      >
        <Image src="/logo.png" alt="logo" height={30} width={30} />
        <p
          className={cn("text-lg text-neutral-700 pt-1", headingFont.className)}
        >
          일처리
        </p>
      </div>
    </Link>
  );
};
