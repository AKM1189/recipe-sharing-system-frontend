"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useConfirmStore } from "@/store/confirm.store";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

const ConfirmPopup = () => {
  const { confirm, removeConfirm } = useConfirmStore();
  return (
    <div>
      <Dialog open={confirm.show} onOpenChange={removeConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirm.title}</DialogTitle>
            <DialogDescription>{confirm.body}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={removeConfirm}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => {
                confirm.onConfirm();
                removeConfirm();
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmPopup;
