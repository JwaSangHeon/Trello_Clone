import Link from "next/link";
import localFont from "next/font/local";
import { Noto_Sans } from "next/font/google";
import { Medal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const headingFont = localFont({
  src: "../../public/fonts/font.ttf",
});

const textFont = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className={cn(
          "flex justify-center items-center flex-col",
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm rounded-full p-4 bg-amber-100 text-amber-700">
          <Medal className="h-6 w-6 mr-2" />
          1등 업무 관리 앱
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          일처리가 여러분을 도와줍니다.
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 p-2 rounded-md  w-fit">
          일을 쉽게하세요.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        협업하고, 프로젝트를 관리하며 새로운 생산성 최고점에 도달하세요. 회사,
        집, 여러분이 일하는 곳 어디서든지 이 앱을 사용해서 업무 관리를 하세요.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">무료로 시작하기</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
