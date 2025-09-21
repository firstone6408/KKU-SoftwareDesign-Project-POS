"use client";

import { Button } from "@/components/ui/button";
import { Eye, Pen, Trash } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { CustomerDetailModal } from "./customer-detail-modal";
import { ICustomer } from "../../schemas/customer.schema";
import { DeleteCustomerButton } from "./delete-customer-button";
import { UpdateCustomerModal } from "./update-customer-modal";

interface CustomerActionProps {
  customer: ICustomer;
}

export function CustomerAction({ customer }: CustomerActionProps) {
  const customerDetailModal = useModal<ICustomer>();
  const updateCustomerModal = useModal<ICustomer>();

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => updateCustomerModal.openModal(customer)}
        >
          <Pen />
        </Button>

        <DeleteCustomerButton
          variant={"destructive"}
          className="cursor-pointer"
          customer={customer}
          icon={Trash}
        />

        <Button
          className="cursor-pointer"
          onClick={() => customerDetailModal.openModal(customer)}
        >
          <Eye />
        </Button>
      </div>

      {/* Modal */}
      <UpdateCustomerModal
        onOpenChange={updateCustomerModal.setIsOpen}
        open={updateCustomerModal.isOpen}
        onClose={updateCustomerModal.closeModal}
        customer={updateCustomerModal.selected}
      />
      <CustomerDetailModal
        onOpenChange={customerDetailModal.setIsOpen}
        open={customerDetailModal.isOpen}
        onClose={customerDetailModal.closeModal}
        customer={customerDetailModal.selected}
      />
    </>
  );
}
