import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { getCustomerList } from "@/features/customers/services/customer.service";
import { CreateOrderButton } from "@/features/orders/components/create/create-order-button";
import { OrderListTable } from "@/features/orders/components/order-list-table";
import { getOrderList } from "@/features/orders/services/order.service";
import { UserRoleEnum } from "@/features/users/services/user.enum";
import { AuthClient } from "@/utils/auth.utils";
import { Plus } from "lucide-react";

export default async function OrderPage() {
  const { token, user } =
    await AuthClient.getInstance().getAuthenticatedUser();

  const customers = await getCustomerList(token);
  let orders = await getOrderList(token);

  if (user.role !== UserRoleEnum.ADMIN) {
    orders = orders.filter((order) => order.createdBy.id === user.id);
  }

  return (
    <div className="main-container">
      {/* Header */}
      <Header
        title="รายการสั่งซื้อ"
        description="สำหรับการเพิ่ม ลบ แก้ไข เกี่ยวกับคำสั่งซื้อ"
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
