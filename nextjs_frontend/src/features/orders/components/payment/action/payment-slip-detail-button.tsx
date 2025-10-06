"use client";

import { DownloadButton } from "@/components/shared/button/download-button";
import { Modal } from "@/components/shared/modal/modal";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/features/orders/schemas/order.schema";
import { useModal } from "@/hooks/use-modal";
import { ButtonProps } from "@/interfaces/components/button";
import { OrderUtil } from "@/utils/order.utils";
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
        <div className="space-y-2">
          <div className="relative aspect-square">
            <Image
              src={UrlUtil.getImageUrl(order.saleInovice.slipImageUrl)}
              fill
              alt={`order-slip-image-${order.orderCode}`}
              className="object-contain"
            />
          </div>
          <DownloadButton
            className="w-full"
            fileUrl={UrlUtil.getImageUrl(order.saleInovice.slipImageUrl)}
            fileName={OrderUtil.file.slipImage.filename(order)}
            variant={"secondary"}
          >
            ดาวน์โหลด
          </DownloadButton>
        </div>
      </Modal>
    </>
  );
}
