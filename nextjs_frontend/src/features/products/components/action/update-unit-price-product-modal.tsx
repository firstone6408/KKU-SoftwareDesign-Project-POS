"use client";

import { ModalProps } from "@/interfaces/components/modal";
import { IProduct } from "../../schemas/product.schema";
import { Modal } from "@/components/shared/modal/modal";
import { useForm } from "@/hooks/use-form";
import { updateUnitPriceProductAction } from "../../actions/product.action";
import { Form } from "@/utils/form.utils";
import { InputField } from "@/components/shared/field/input-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Save } from "lucide-react";
import { useEffect } from "react";

interface UpdateUnitPriceProductModalProps extends ModalProps {
  product: IProduct | null;
}

export function UpdateUnitPriceProductModal({
  product,
  open,
  onClose,
  onOpenChange,
}: UpdateUnitPriceProductModalProps) {
  const { formAction, isPending, error, clearError, state } = useForm({
    action: updateUnitPriceProductAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      if (onClose) onClose();
    }
  }, [state, onClose]);

  if (!product) return null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="ปรับราคาสินค้า"
      description="ปรับราคาสินค้า (Unit Price) ในคลังสินค้า"
    >
      <Form
        action={formAction}
        onChange={clearError}
        className="space-y-3"
      >
        <input type="hidden" name="product-id" defaultValue={product.id} />
        <InputField
          label="ราคาสินค้า"
          name="product-unit-price"
          type="number"
          step="0.01"
          defaultValue={product.unitPrice}
          errorMessage={error.productUnitPrice}
          required
        />
        <SubmitButton className="w-full" isPending={isPending} icon={Save}>
          บันทึก
        </SubmitButton>
      </Form>
    </Modal>
  );
}
