"use client";

import { OrderUtil } from "@/utils/order.utils";
import { useState } from "react";
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
import { InputField } from "@/components/shared/field/input-field";

interface SalesByDayChartProps {
  orders: IOrder[];
}

export function SalesByYearChart({ orders }: SalesByDayChartProps) {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const yearlySales = OrderUtil.aggregate.salesByYear(
    orders,
    year + "-01-01"
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">ยอดขายรายปี</h3>
      <InputField
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border rounded p-1 mb-2"
      />
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={[{ name: year, value: yearlySales }]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
