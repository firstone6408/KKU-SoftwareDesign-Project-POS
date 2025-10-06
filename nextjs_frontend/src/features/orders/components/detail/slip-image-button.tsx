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
        title="หลักฐานการชําระเงิน"
        description=""
      >
        <div className="flex justify-center">
          <div className="relative size-[25rem]">
            <Image
              src={UrlUtil.getImageUrl(order.saleInovice.slipImageUrl!)}
              fill
              className="object-contain"
              alt="order-slip-image"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
