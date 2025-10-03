"use client";

import { OrderUtil } from "@/utils/order.utils";
import { useState } from "react";
import { IOrder } from "../../../schemas/order.schema";
import { InputField } from "@/components/shared/field/input-field";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";

interface SalesByDayChartProps {
  orders: IOrder[];
}

export function SalesByDayChart({ orders }: SalesByDayChartProps) {
  const [day, setDay] = useState(new Date().toISOString().slice(0, 10));
  const dailySales = OrderUtil.aggregate.salesByDay(orders, day);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">ยอดขายรายวัน</h3>
      <InputField
        type="date"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="border rounded p-1 mb-2"
      />
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={[{ name: day, value: dailySales }]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
