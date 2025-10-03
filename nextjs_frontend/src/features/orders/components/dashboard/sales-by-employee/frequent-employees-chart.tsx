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

interface FrequentEmployeesChartProps {
  orders: IOrder[];
}

export function FrequentEmployeesChart({
  orders,
}: FrequentEmployeesChartProps) {
  const data = Object.entries(
    OrderUtil.aggregate.frequentEmployees(orders)
  ).map(([key, value]) => ({ name: key, value }));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">
        พนักงานทำยอดเยอะสุด (จำนวน Order)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
