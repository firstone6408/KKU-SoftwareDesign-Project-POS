"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { deleteItemInOrderAction } from "@/features/orders/actions/order.action";
import {
  IOrder,
  IOrderItem,
} from "@/features/orders/schemas/order.schema";
import { initialFormState } from "@/interfaces/actions/action";
import { SubmitButtonProps } from "@/interfaces/components/button";
import { Trash } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useTransition,
} from "react";

interface DeleteItemInOrderButtonProps extends SubmitButtonProps {
  order: IOrder;
  orderItem: IOrderItem;
  quantity: number;
  isConfirm?: boolean;
  setItemQuantity?: Dispatch<SetStateAction<number>>;
}

export function DeleteItemInOrderButton({
  order,
  orderItem,
  quantity,
  isConfirm = true,
  setItemQuantity,
  ...props
}: DeleteItemInOrderButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [_quantity, setQuantity] = useState<number>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    setQuantity((prev) => prev + 1);
    if (setItemQuantity) {
      setItemQuantity((prev) => prev - 1);
    }

    let time;
    let qty;

    if (isConfirm) {
      time = 0;
      qty = quantity;
    } else {
      time = 1000;
      qty = _quantity;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("order-id", order.id);
        formData.append("product-id", orderItem.product.id);
        formData.append("order-item-id", orderItem.id);
        formData.append("quantity", qty.toString());
        await deleteItemInOrderAction(initialFormState, formData);
      });
      setQuantity(1);
      timerRef.current = null;
    }, time);
  };

  return (
    <SubmitButton
      {...props}
      onClick={handleClick}
      icon={props.icon ? props.icon : Trash}
      isPending={isPending}
    />
  );
}
