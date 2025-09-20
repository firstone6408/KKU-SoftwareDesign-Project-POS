"use client";

import { Button } from "@/components/ui/button";
import { ICustomer } from "../../services/productcategory.interface";
import { Eye, Pen, Trash } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { CustomerDetailModal } from "./customer-detail-modal";

interface CustomerActionProps {
  customer: ICustomer;
}

export function CustomerAction({ customer }: CustomerActionProps) {
  const customerDetailModal = useModal<ICustomer>();

  return (
    <>
      <div className="flex justify-center gap-2">
        <div>
          <Button variant={"outline"} className="cursor-pointer">
            <Pen />
          </Button>
        </div>
        <div>
          <Button variant={"destructive"} className="cursor-pointer">
            <Trash />
          </Button>
        </div>
        <div>
          <Button
            className="cursor-pointer"
            onClick={() => customerDetailModal.openModal(customer)}
          >
            <Eye />
          </Button>
        </div>
      </div>

      <CustomerDetailModal
        onOpenChange={customerDetailModal.setIsOpen}
        open={customerDetailModal.isOpen}
        onClose={customerDetailModal.closeModal}
        customer={customerDetailModal.selected}
      />
    </>
  );
}
