"use client";

import { OrderUtil } from "@/utils/order.utils";
import { IOrder } from "../../../schemas/order.schema";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SalesByCustomerChartProps {
  orders: IOrder[];
}

export function SalesByCustomerChart({
  orders,
}: SalesByCustomerChartProps) {
  const data = Object.entries(
    OrderUtil.aggregate.salesByCustomer(orders)
  ).map(([key, value]) => ({ name: key, value }));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">ยอดขายแต่ละลูกค้า</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
