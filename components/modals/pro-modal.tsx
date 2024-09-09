"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export const ProModal = () => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 pt-2 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/payment.svg" alt="payment" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            일처리 Pro플랜으로 업그레이드 해보세요!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            혜택은 다음과 같아요
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>무제한 board 생성</li>
              <li>향상된 checklist</li>
              <li>관리자기능</li>
              <li>보안기능</li>
            </ul>
          </div>
          <Button
            className="w-full"
            variant="primary"
            disabled={isLoading}
            onClick={onClick}
          >
            업그레이드 하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
