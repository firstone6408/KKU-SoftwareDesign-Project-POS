"use client";

import { useModal } from "@/hooks/use-modal";
import { IOrder } from "../../schemas/order.schema";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/interfaces/components/button";
import { Modal } from "@/components/shared/modal/modal";
import Image from "next/image";
import { UrlUtil } from "@/utils/url.utils";

interface SlipImageButtonProps extends ButtonProps {
  order: IOrder;
}

export function SlipImageButton({
  order,
  ...props
}: SlipImageButtonProps) {
  const modal = useModal<IOrder>();

  if (!order.saleInovice?.slipImageUrl) return null;

  return (
    <>
      {/* Button */}
      <Button {...props} onClick={() => modal.openModal(order)} />

      {/* Modal */}
      <Modal
        open={modal.isOpen}
        onOpenChange={modal.setIsOpen}
        title="สลิปการชําระเงิน"
        description=""
      >
        <div className="relative size-60 rounded border-2 border-primary">
          <Image
            src={UrlUtil.getImageUrl(order.saleInovice.slipImageUrl!)}
            fill
            className="object-contain"
            alt="order-slip-image"
          />
        </div>
      </Modal>
    </>
  );
}
