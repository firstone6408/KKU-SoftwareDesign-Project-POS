"use client";

import { OrderUtil } from "@/utils/order.utils";
import { IOrder } from "../../schemas/order.schema";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BestSellingProductsChartProps {
  orders: IOrder[];
}

export function BestSellingProductsChart({
  orders,
}: BestSellingProductsChartProps) {
  const data = Object.entries(
    OrderUtil.aggregate.bestSellingProducts(orders)
  ).map(([key, value]) => ({ name: key, value }));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">สินค้าขายดี</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
