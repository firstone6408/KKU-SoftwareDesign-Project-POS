import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ModalType } from "@/interfaces/components/modal";
import { IProductCategory } from "../../services/productcategory.interface";

interface ProductCategoryDetailModalProps extends ModalType {
  productcategory: IProductCategory | null;
}

export function ProductCategoryDetailModal({
  onOpenChange,
  open,
  productcategory,
}: ProductCategoryDetailModalProps) {
  // ตรวจสอบว่า productcategory มีค่าหรือไม่
  if (!productcategory) {
    return null; // หรือแสดง loading/empty state
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4"></div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
