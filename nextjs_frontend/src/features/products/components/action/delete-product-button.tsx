"use client";

import { SubmitButtonProps } from "@/interfaces/components/button";
import { IProduct } from "../../schemas/product.schema";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { useForm } from "@/hooks/use-form";
import { deleteProductAction } from "../../actions/product.action";
import { Form } from "@/utils/form.utils";
import { useEffect } from "react";

interface DeleteProductButtonProps extends SubmitButtonProps {
  product: IProduct;
  onClose?: (() => void) | undefined;
}

export function DeleteProductButton({
  product,
  onClose,
  ...props
}: DeleteProductButtonProps) {
  const { formAction, isPending, state } = useForm({
    action: deleteProductAction,
    mode: "controlled",
  });

  useEffect(() => {
    if (state && state.status === "success") {
      if (onClose) {
        onClose();
      }
    }
  }, [state, onClose]);

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: `ลบสินค้า "${product.name}"`,
        description:
          "การลบนี้เป็นการลบถาวรจะไม่สามารถกู้คืนข้อมูลกลับมาได้",
      }}
    >
      <input type="hidden" name="product-id" defaultValue={product.id} />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
