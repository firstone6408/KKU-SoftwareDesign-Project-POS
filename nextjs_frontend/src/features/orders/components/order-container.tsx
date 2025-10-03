"use client";

import { Plus } from "lucide-react";
import { IOrder } from "../schemas/order.schema";
import { CreateOrderButton } from "./create/create-order-button";
import { OrderListTable } from "./order-list-table";
import { ICustomer } from "@/features/customers/schemas/customer.schema";
import { OrderSearch } from "./order-search";
import { useState } from "react";

interface OrderContainerProps {
  customers: ICustomer[];
  orders: IOrder[];
}

export function OrderContainer({
  customers,
  orders,
}: OrderContainerProps) {
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>(orders);

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        {/* Create order form modal */}
        <CreateOrderButton customers={customers}>
          <Plus />
          <span>สร้างคำสั่งซื้อใหม่</span>
        </CreateOrderButton>

        {/* Search */}
        <div className="flex justify-end">
          <OrderSearch
            orders={orders}
            setFilteredOrders={setFilteredOrders}
          />
        </div>
      </div>

      {/* Table */}
      <OrderListTable
        card={{
          container: true,
          header: true,
          content: true,
        }}
        orders={filteredOrders}
      />
    </>
  );
}
