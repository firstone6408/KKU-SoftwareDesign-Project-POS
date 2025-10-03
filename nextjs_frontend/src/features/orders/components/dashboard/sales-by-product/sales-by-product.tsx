import { BaseCard } from "@/components/shared/card/base-card";
import { IOrder } from "@/features/orders/schemas/order.schema";
import { BaseCardProps } from "@/interfaces/components/card";
import { BestSellingProductsChart } from "./best-selling-products-chart";

interface SalesByProductProps extends BaseCardProps {
  orders: IOrder[];
}

export function SalesByProduct({ orders, ...props }: SalesByProductProps) {
  return (
    <BaseCard
      {...props}
      headerTitle="ยอดขายตามสินค้า"
      headerDescription="แสดงยอดขายตามสินค้า"
      content={
        <section>
          <BestSellingProductsChart orders={orders} />
        </section>
      }
    />
  );
}
