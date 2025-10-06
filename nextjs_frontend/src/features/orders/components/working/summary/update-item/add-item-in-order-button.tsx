"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { addItemInOrderAction } from "@/features/orders/actions/order.action";
import {
  IOrder,
  IOrderItem,
} from "@/features/orders/schemas/order.schema";
import { initialFormState } from "@/interfaces/actions/action";
import { SubmitButtonProps } from "@/interfaces/components/button";
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useTransition,
} from "react";

interface AddItemInOrderButtonProps extends SubmitButtonProps {
  order: IOrder;
  orderItem: IOrderItem;
  setItemQuantity: Dispatch<SetStateAction<number>>;
}

export function AddItemInOrderButton({
  order,
  orderItem,
  setItemQuantity,
  ...props
}: AddItemInOrderButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState<number>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    setQuantity((prev) => prev + 1);
    setItemQuantity((prev) => prev + 1);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("order-id", order.id);
        formData.append("product-id", orderItem.product.id);
        formData.append(
          "product-unit-price",
          orderItem.unitPrice.toString()
        );
        formData.append("quantity", quantity.toString());
        await addItemInOrderAction(initialFormState, formData);
      });
      setQuantity(1);
      timerRef.current = null;
    }, 1000);
  };

  return (
    <SubmitButton {...props} onClick={handleClick} isPending={isPending} />
  );
}
