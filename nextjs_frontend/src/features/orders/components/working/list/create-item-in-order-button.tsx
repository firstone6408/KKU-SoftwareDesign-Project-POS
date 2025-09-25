"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { InputField } from "@/components/shared/field/input-field";
import { Modal } from "@/components/shared/modal/modal";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/features/products/schemas/product.schema";
import { useForm } from "@/hooks/use-form";
import { useModal } from "@/hooks/use-modal";
import { ButtonProps } from "@/interfaces/components/button";
import { Form } from "@/utils/form.utils";
import { Save } from "lucide-react";
import { addItemInOrderAction } from "../../../actions/order.action";
import { IOrder } from "../../../schemas/order.schema";
import { useEffect } from "react";

interface CreateItemInOrderButtonProps extends ButtonProps {
  order: IOrder;
  product: IProduct;
}

export function CreateItemInOrderButton({
  order,
  product,
  ...props
}: CreateItemInOrderButtonProps) {
  const modal = useModal();

  const { formAction, isPending, error, clearError, state } = useForm({
    action: addItemInOrderAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      modal.setIsOpen(false);
      state.status = "server-error";
    }
  }, [state, modal]);

  return (
    <>
      {/* Button */}
      <Button
        onClick={() => {
          modal.setIsOpen(true);
        }}
        {...props}
      />

      {/* Modal */}
      <Modal
        open={modal.isOpen}
        onOpenChange={modal.setIsOpen}
        title={`เพิ่มสินค้าลงในคำสั่งซื้อ`}
        description={`คุณต้องการเพิ่ม "${product.name}" ลงในคำสั่งซื้อหรือไม่?`}
      >
        <Form
          action={formAction}
          onChange={clearError}
          className="space-y-3"
        >
          <input type="hidden" name="order-id" defaultValue={order.id} />
          <input
            type="hidden"
            name="product-id"
            defaultValue={product.id}
          />
          <InputField
            label="ราคา"
            name="product-unit-price"
            type="number"
            step={0.01}
            defaultValue={product.unitPrice}
            errorMessage={error.productUnitPrice}
            required
          />
          <InputField
            label="จำนวน"
            name="quantity"
            type="number"
            step={1}
            errorMessage={error.quantity}
            required
          />
          <SubmitButton
            className="w-full"
            icon={Save}
            isPending={isPending}
          >
            เพิ่ม
          </SubmitButton>
        </Form>
      </Modal>
    </>
  );
}
