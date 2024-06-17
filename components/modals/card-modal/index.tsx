import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardMadal } from "@/hooks/use-card-modal";

export const CardModal = () => {
  const { id, isOpen, onClose } = useCardMadal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>Im a modal!!!</DialogContent>
    </Dialog>
  );
};
