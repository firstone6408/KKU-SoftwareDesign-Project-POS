"use client";

import { Modal } from "@/components/shared/modal/modal";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/features/orders/schemas/order.schema";
import { useModal } from "@/hooks/use-modal";
import { ButtonProps } from "@/interfaces/components/button";
import { UrlUtil } from "@/utils/url.utils";
import Image from "next/image";

interface PaymentSlipDetailButton extends ButtonProps {
  order: IOrder;
}

export function PaymentSlipDetailButton({
  order,
  ...props
}: PaymentSlipDetailButton) {
  const modal = useModal();

  if (!order.saleInovice?.slipImageUrl) return;

  return (
    <>
      {/* Button */}
      <Button {...props} onClick={() => modal.openModal(undefined)} />

      {/* Modal */}
      <Modal
        open={modal.isOpen}
        onOpenChange={modal.setIsOpen}
        title="หลักฐานการชำระเงิน"
        description=""
      >
        <div className="relative aspect-square">
          <Image
            src={UrlUtil.getImageUrl(order.saleInovice.slipImageUrl)}
            fill
            alt={`order-slip-image-${order.orderCode}`}
          />
        </div>
      </Modal>
    </>
  );
}
