import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { PaymentForm } from "@/features/orders/components/payment/action/payment-form";
import { OrderSummaryForPayment } from "@/features/orders/components/payment/order-summary-for-payment";
import { getOrderById } from "@/features/orders/services/order.service";
import { AuthClient } from "@/utils/auth.utils";
import { OrderUtil } from "@/utils/order.utils";
import { redirect } from "next/navigation";

interface OrderPaymentPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderPaymentPage({
  params,
}: OrderPaymentPageProps) {
  const { id } = await params;

  const { token } = await AuthClient.getInstance().getAuthenticatedUser();

  const order = await getOrderById(token, id);

  if (!order || OrderUtil.check.canDoPayment(order)) {
    redirect("/orders");
  }

  return (
    <div className="main-container">
      {/* Header */}
      <Header
        title={`ชำระเงินสำหรับคำสั่งซื้อ #${order.orderCode}`}
        description={`กรุณาตรวจสอบรายละเอียดและดำเนินการชำระเงินสำหรับคำสั่งซื้อหมายเลข${order.orderCode}`}
      />

      <Separator />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Payment */}
        <div className="col-span-3">
          <PaymentForm order={order} />
        </div>

        {/* Order Summary */}
        <div className="col-span-2">
          <OrderSummaryForPayment order={order} />
        </div>
      </div>
    </div>
  );
}
