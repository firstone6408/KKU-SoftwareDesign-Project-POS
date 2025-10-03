"use client";

import { InputField } from "@/components/shared/field/input-field";
import { IOrder } from "../../../schemas/order.schema";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";
import { OrderUtil } from "@/utils/order.utils";
import { useState } from "react";

interface SalesByMonthChartProps {
  orders: IOrder[];
}

export function SalesByMonthChart({ orders }: SalesByMonthChartProps) {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const monthlySales = OrderUtil.aggregate.salesByMonth(
    orders,
    month + "-01"
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">ยอดขายรายเดือน</h3>
      <InputField
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border rounded p-1 mb-2"
      />
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={[{ name: month, value: monthlySales }]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
