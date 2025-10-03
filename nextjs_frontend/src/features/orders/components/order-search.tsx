"use client";

import { useEffect, useState } from "react";
import { IOrder } from "../schemas/order.schema";
import { InputSearch } from "@/components/shared/search/input-search";
import { SelectArrField } from "@/components/shared/field/select-field";
import { OrderStatusEnum } from "../services/order.enum";
import { TransaleEnumUtil } from "@/utils/translate-enum.utils";
import { useDebounce } from "@/hooks/use-debounce";

interface OrderSearchProps {
  orders: IOrder[];
  setFilteredOrders: React.Dispatch<IOrder[]>;
}

export function OrderSearch({
  orders,
  setFilteredOrders,
}: OrderSearchProps) {
  const [selectOrderStatus, setSelectOrderStatus] =
    useState("สถานะทั้งหมด");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const debouncedSelectOrderStatus = useDebounce(selectOrderStatus);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      // ตรวจ search
      const searchLower = debouncedSearchTerm.toLowerCase();
      const matchesSearch =
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.orderCode.toLowerCase().includes(searchLower);

      // ตรวจ status
      const matchesStatus =
        debouncedSelectOrderStatus === "สถานะทั้งหมด"
          ? true
          : order.status === debouncedSelectOrderStatus;

      return matchesSearch && matchesStatus;
    });

    setFilteredOrders(filtered);
  }, [
    debouncedSearchTerm,
    debouncedSelectOrderStatus,
    orders,
    setFilteredOrders,
  ]);

  return (
    <div className="flex items-end gap-2">
      {/* Status Select */}
      <SelectArrField
        data={["สถานะทั้งหมด", ...Object.values(OrderStatusEnum)]}
        translateFn={TransaleEnumUtil.orderStatus}
        defaultValue="สถานะทั้งหมด"
        onValueChange={setSelectOrderStatus}
      />

      {/* Input Search */}
      <InputSearch
        setSearchTerm={setSearchTerm}
        placeholder="ค้นหาใบสั่งซื้อ..."
      />
    </div>
  );
}
