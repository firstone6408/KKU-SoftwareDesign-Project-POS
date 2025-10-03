import { BaseCard } from "@/components/shared/card/base-card";
import { IOrder } from "@/features/orders/schemas/order.schema";
import { BaseCardProps } from "@/interfaces/components/card";
import { User } from "lucide-react";
import { FrequentEmployeesChart } from "./frequent-employees-chart";
import { SalesByEmployeeChart } from "./sales-by-employee-chart";

interface SalesByEmployeeProps extends BaseCardProps {
  orders: IOrder[];
}

export function SalesByEmployee({
  orders,
  ...props
}: SalesByEmployeeProps) {
  return (
    <BaseCard
      {...props}
      headerTitleIcon={User}
      headerTitle="ยอดขายตามพนักงาน"
      headerDescription="แสดงยอดขายตามพนักงาน"
      content={
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FrequentEmployeesChart orders={orders} />
          <SalesByEmployeeChart orders={orders} />
        </section>
      }
    />
  );
}
