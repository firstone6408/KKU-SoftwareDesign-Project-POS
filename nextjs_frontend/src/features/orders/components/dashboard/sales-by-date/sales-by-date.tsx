import { IOrder } from "@/features/orders/schemas/order.schema";
import { SalesByDayChart } from "./sales-by-day-chart";
import { SalesByMonthChart } from "./sales-by-month-chart";
import { SalesByYearChart } from "./sales-by-year-chart";
import { BaseCardProps } from "@/interfaces/components/card";
import { BaseCard } from "@/components/shared/card/base-card";
import { Calendar } from "lucide-react";

interface SalesByDateProps extends BaseCardProps {
  orders: IOrder[];
}

export function SalesByDate({ orders, ...props }: SalesByDateProps) {
  return (
    <BaseCard
      {...props}
      headerTitleIcon={Calendar}
      headerTitle="ยอดขายตามวันที่"
      headerDescription="แสดงยอดขายตามวันที่ เช่น วัน, เดือน, ปี"
      content={
        <section className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <SalesByYearChart orders={orders} />
          <SalesByMonthChart orders={orders} />
          <SalesByDayChart orders={orders} />
        </section>
      }
    />
  );
}
