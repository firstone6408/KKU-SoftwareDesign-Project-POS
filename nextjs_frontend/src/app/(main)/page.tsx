import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { getOrderList } from "@/features/orders/services/order.service";
import { AuthClient } from "@/utils/auth.utils";
import { SalesByDate } from "@/features/orders/components/dashboard/sales-by-date/sales-by-date";
import { SalesByCustomer } from "@/features/orders/components/dashboard/sales-by-customer/sales-by-customer";
import { SalesByEmployee } from "@/features/orders/components/dashboard/sales-by-employee/sales-by-employee";
import { SalesByProduct } from "@/features/orders/components/dashboard/sales-by-product/sales-by-product";

export default async function DashboardPage() {
  const { token } = await AuthClient.getInstance().getAuthenticatedUser();

  const orders = await getOrderList(token);

  return (
    <div className="main-container">
      <Header title="Dashboard" description="แสดงการรายงานผลทั้งหมด" />
      <Separator />

      {/* Date */}
      <SalesByDate
        card={{ container: true, header: true, content: true }}
        orders={orders}
      />

      {/* Customer */}
      <SalesByCustomer
        card={{ container: true, header: true, content: true }}
        orders={orders}
      />
      {/* Employee */}
      <SalesByEmployee
        card={{ container: true, header: true, content: true }}
        orders={orders}
      />

      {/* Product */}
      <SalesByProduct
        card={{ container: true, header: true, content: true }}
        orders={orders}
      />
    </div>
  );
}
