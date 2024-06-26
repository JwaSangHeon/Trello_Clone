import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { HelpCircle, User2 } from "lucide-react";

import { db } from "@/lib/db";
import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { Board } from "@prisma/client";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect(`/select-org`);
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="group aspect-video relative bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition " />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              sideOffset={40}
              description={`무료 워크스페이스는 보드를 5개까지 만들 수 있습니다. 더 만드실려면 워크스페이스를 업데이트 해주세요.`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video w-full h-full p-2"></Skeleton>
      <Skeleton className="aspect-video w-full h-full p-2"></Skeleton>
      <Skeleton className="aspect-video w-full h-full p-2"></Skeleton>
      <Skeleton className="aspect-video w-full h-full p-2"></Skeleton>
      <Skeleton className="aspect-video w-full h-full p-2"></Skeleton>
      <Skeleton className="aspect-video w-full h-full p-2"></Skeleton>
      <Skeleton className="aspect-video w-full h-full p-2"></Skeleton>
      <Skeleton className="aspect-video w-full h-full p-2"></Skeleton>
    </div>
  );
};

export default BoardList;
