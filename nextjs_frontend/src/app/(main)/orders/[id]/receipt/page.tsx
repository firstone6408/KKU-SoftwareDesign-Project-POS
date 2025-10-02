import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { OrderReceipt } from "@/features/orders/components/receipt/order-receipt";
import { getOrderById } from "@/features/orders/services/order.service";
import { AuthClient } from "@/utils/auth.utils";
import { redirect } from "next/navigation";

interface OrderReceiptPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderReceiptPage({
  params,
}: OrderReceiptPageProps) {
  const { token } = await AuthClient.getInstance().getAuthenticatedUser();
  const { id } = await params;

  const order = await getOrderById(token, id);

  if (!order) {
    redirect("/orders");
  }

  return (
    <div className="main-container">
      {/* Header */}
      <Header
        title={`ใบเสร็จรับเงินสำหรับคำสั่งซื้อ #${order.orderCode}`}
        description={`ใบเสร็จรับเงินสำหรับคำสั่งซื้อหมายเลข ${order.orderCode}`}
      />
      <Separator />

      {/* Receipt */}
      <OrderReceipt order={order} />
    </div>
  );
}
