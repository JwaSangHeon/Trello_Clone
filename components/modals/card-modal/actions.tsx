"use client";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";

import { CardWithList } from "@/types";

import { useAction } from "@/hooks/use-action";
import { useCardMadal } from "@/hooks/use-card-modal";

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardMadal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`${data.title} 카드를 생성했습니다.`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`${data.title} 카드를 삭제했습니다.`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gary"
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="w-4 h-4 mr-2" />
        복사하기
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant="gary"
        className="w-full justify-start"
        size="inline"
      >
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
