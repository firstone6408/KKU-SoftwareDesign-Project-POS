import { BaseCard } from "@/components/shared/card/base-card";
import { IOrder } from "@/features/orders/schemas/order.schema";
import { BaseCardProps } from "@/interfaces/components/card";
import { Users } from "lucide-react";
import { FrequentCustomersChart } from "./frequent-customers-chart";
import { SalesByCustomerChart } from "./sales-by-customer-chart";

interface SalesByCustomerProps extends BaseCardProps {
  orders: IOrder[];
}

export function SalesByCustomer({
  orders,
  ...props
}: SalesByCustomerProps) {
  return (
    <BaseCard
      {...props}
      headerTitleIcon={Users}
      headerTitle="ยอดขายตามลูกค้า"
      headerDescription="แสดงยอดขายตามลูกค้า"
      content={
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FrequentCustomersChart orders={orders} />
          <SalesByCustomerChart orders={orders} />
        </section>
      }
    />
  );
}
