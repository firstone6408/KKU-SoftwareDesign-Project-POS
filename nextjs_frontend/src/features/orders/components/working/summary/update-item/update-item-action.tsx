"use client";

import {
  IOrder,
  IOrderItem,
} from "@/features/orders/schemas/order.schema";
import { AddItemInOrderButton } from "./add-item-in-order-button";
import { Minus, Plus } from "lucide-react";
import { DeleteItemInOrderButton } from "./delete-item-in-order-button";

interface UpdateItemAction {
  order: IOrder;
  orderItem: IOrderItem;
}

export function UpdateItemAction({ order, orderItem }: UpdateItemAction) {
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
      />
      <span>{orderItem.quantity}</span>
      <AddItemInOrderButton
        order={order}
        orderItem={orderItem}
        icon={Plus}
        size={"sm"}
        variant={"outline"}
      />
    </div>
  );
}
