import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { getCustomerList } from "@/features/customers/services/customer.service";
import { OrderContainer } from "@/features/orders/components/order-container";
import { getOrderList } from "@/features/orders/services/order.service";
import { UserRoleEnum } from "@/features/users/services/user.enum";
import { AuthClient } from "@/utils/auth.utils";

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
      <OrderContainer customers={customers} orders={orders} />
    </div>
  );
}
