"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { deleteItemInOrderAction } from "@/features/orders/actions/order.action";
import {
  IOrder,
  IOrderItem,
} from "@/features/orders/schemas/order.schema";
import { useForm } from "@/hooks/use-form";
import { SubmitButtonProps } from "@/interfaces/components/button";
import { Form } from "@/utils/form.utils";
import { Trash } from "lucide-react";

interface DeleteItemInOrderButtonProps extends SubmitButtonProps {
  order: IOrder;
  orderItem: IOrderItem;
  quantity: number;
  isConfirm?: boolean;
}

export function DeleteItemInOrderButton({
  order,
  orderItem,
  quantity,
  isConfirm = true,
  ...props
}: DeleteItemInOrderButtonProps) {
  const { formAction, isPending } = useForm({
    action: deleteItemInOrderAction,
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      {...(isConfirm
        ? {
            confirmConfig: {
              title: `ลบ "${orderItem.product.name}" ออกจากรายการ`,
            },
          }
        : {})}
    >
      <input type="hidden" name="order-id" defaultValue={order.id} />
      <input
        type="hidden"
        name="order-item-id"
        defaultValue={orderItem.id}
      />
      <input
        type="hidden"
        name="product-id"
        defaultValue={orderItem.product.id}
      />
      <input type="hidden" name="quantity" defaultValue={quantity} />
      <SubmitButton
        {...props}
        icon={props.icon ? props.icon : Trash}
        isPending={isPending}
      />
    </Form>
  );
}
