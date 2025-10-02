import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { OrderDetail } from "@/features/orders/components/detail/order-detail";
import { getOrderById } from "@/features/orders/services/order.service";
import { AuthClient } from "@/utils/auth.utils";
import { OrderUtil } from "@/utils/order.utils";
import { redirect } from "next/navigation";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { token } = await AuthClient.getInstance().getAuthenticatedUser();
  const { id } = await params;

  const order = await getOrderById(token, id);

  if (!order || !OrderUtil.check.canDoWorking(order)) {
    redirect("/orders");
  }

  return (
    <div className="main-container">
      {/* Header */}
      <Header
        title={`รายละเอียดคำสั่งซื้อ #${order.orderCode}`}
        description={`รายละเอียดคำสั่งซื้อหมายเลข ${order.orderCode}`}
      />
      <Separator />

      {/* Detail */}
      <OrderDetail
        card={{
          container: true,
          content: true,
        }}
        order={order}
      />
    </div>
  );
}
