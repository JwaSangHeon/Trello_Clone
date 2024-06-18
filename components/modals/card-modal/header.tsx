"use client";

import { ElementRef, useRef, useState } from "react";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { FormInput } from "@/components/form/form-input";
import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { updateCard } from "@/actions/update-card";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

interface HeaderProps {
  data: CardWithList;
}

export const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`카드의 이름이 ${data.title}로 변경됐습니다.`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const [title, setTitle] = useState(data.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === data.title) {
      return;
    }

    execute({
      title,
      boardId,
      id: data.id,
    });
  };

  return (
    <div className="flex gap-x-3 w-full items-start mb-6">
      <Layout className="w-5 h-5 text-neutral-700 mt-1" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className="font-semibold px-1 relative -left-1.5
            text-xl text-neutral-700
            bg-transparent border-transparent w-[95%] 
            truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex gap-x-3 mb-6">
      <Skeleton className="w-6 h-6 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-6 bg-neutral-200" />
      </div>
    </div>
  );
};
