import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { getCustomerList } from "@/features/customers/services/customer.service";
import { CreateOrderButton } from "@/features/orders/components/create/create-order-button";
import { OrderListTable } from "@/features/orders/components/order-list-table";
import { getOrderList } from "@/features/orders/services/order.service";
import { AuthClient } from "@/utils/auth.utils";
import { Plus } from "lucide-react";

export default async function OrderPage() {
  const { token } = await AuthClient.getInstance().getAuthenticatedUser();

  const customers = await getCustomerList(token);
  const orders = await getOrderList(token);

  return (
    <div className="main-container">
      {/* Header */}
      <Header
        title="รายการคำสั่งซื้อ"
        description="รายการคำสั่งซื้อทั้งหมดของระบบ"
      />
      <Separator />

      {/* Create order form modal */}
      <div className="text-end">
        <CreateOrderButton customers={customers}>
          <Plus />
          <span>สร้างคำสั่งซื้อใหม่</span>
        </CreateOrderButton>
      </div>

      {/* Table */}
      <OrderListTable
        card={{
          container: true,
          header: true,
          content: true,
        }}
        orders={orders}
      />
    </div>
  );
}
