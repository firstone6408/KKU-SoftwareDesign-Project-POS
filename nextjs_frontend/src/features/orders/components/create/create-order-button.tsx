"use client";

import { Modal } from "@/components/shared/modal/modal";
import { ICustomer } from "@/features/customers/schemas/customer.schema";
import { CustomerListTableForCreateOrder } from "./customer-list-table-for-create-order";
import { ButtonProps } from "@/interfaces/components/button";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

interface CreateOrderButtonProps extends ButtonProps {
  customers: ICustomer[];
}

export function CreateOrderButton({
  customers,
  ...props
}: CreateOrderButtonProps) {
  // modal
  const modal = useModal();

  return (
    <>
      {/* Button */}
      <Button onClick={() => modal.setIsOpen(true)} {...props} />

      {/* Modal */}
      <Modal
        title="เลือกลูกค้า"
        description="กรุณาเลือกลูกค้าที่ต้องการสร้างคำสั่งซื้อ"
        open={modal.isOpen}
        onOpenChange={modal.setIsOpen}
      >
        {/* Table */}
        <CustomerListTableForCreateOrder customers={customers} />
      </Modal>
    </>
  );
}
