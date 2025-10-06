"use client";

import {
  IOrder,
  IOrderItem,
} from "@/features/orders/schemas/order.schema";
import { AddItemInOrderButton } from "./add-item-in-order-button";
import { Minus, Plus } from "lucide-react";
import { DeleteItemInOrderButton } from "./delete-item-in-order-button";
import { useEffect, useState } from "react";

interface UpdateItemAction {
  order: IOrder;
  orderItem: IOrderItem;
}

export function UpdateItemAction({ order, orderItem }: UpdateItemAction) {
  const [itemQuantity, setItemQuantity] = useState<number>(
    orderItem.quantity
  );

  useEffect(() => {
    setItemQuantity(orderItem.quantity);
  }, [orderItem.quantity]);

  return (
    <div className="flex items-center gap-4">
      <DeleteItemInOrderButton
        order={order}
        orderItem={orderItem}
        quantity={1}
        icon={Minus}
        size={"sm"}
        variant={"outline"}
        isConfirm={false}
        setItemQuantity={setItemQuantity}
        disabled={itemQuantity <= 1}
      />

      <span>{itemQuantity}</span>
      <AddItemInOrderButton
        order={order}
        orderItem={orderItem}
        icon={Plus}
        size={"sm"}
        variant={"outline"}
        setItemQuantity={setItemQuantity}
      />
    </div>
  );
}
