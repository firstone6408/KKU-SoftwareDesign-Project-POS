"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { addItemInOrderAction } from "@/features/orders/actions/order.action";
import {
  IOrder,
  IOrderItem,
} from "@/features/orders/schemas/order.schema";
import { useForm } from "@/hooks/use-form";
import { SubmitButtonProps } from "@/interfaces/components/button";
import { Form } from "@/utils/form.utils";

interface AddItemInOrderButtonProps extends SubmitButtonProps {
  order: IOrder;
  orderItem: IOrderItem;
}

export function AddItemInOrderButton({
  order,
  orderItem,
  ...props
}: AddItemInOrderButtonProps) {
  const { formAction, isPending } = useForm({
    action: addItemInOrderAction,
  });

  return (
    <Form action={formAction} className="space-y-3">
      <input type="hidden" name="order-id" defaultValue={order.id} />
      <input
        type="hidden"
        name="product-id"
        defaultValue={orderItem.product.id}
      />

      <input
        type="hidden"
        name="product-unit-price"
        defaultValue={orderItem.unitPrice}
      />
      <input type="hidden" name="quantity" defaultValue={1} />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
