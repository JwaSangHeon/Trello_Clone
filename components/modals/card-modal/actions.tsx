"use client";

import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Copy, Trash } from "lucide-react";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button variant="gary" className="w-full justify-start" size="inline">
        <Copy className="w-4 h-4 mr-2" />
        복사하기
      </Button>
      <Button variant="gary" className="w-full justify-start" size="inline">
        <Trash className="w-4 h-4 mr-2" />
        삭제하기
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
