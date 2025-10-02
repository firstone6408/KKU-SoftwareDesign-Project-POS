import { Separator } from "@/components/ui/separator";
import { IOrder } from "../../schemas/order.schema";
import { BaseCardProps } from "@/interfaces/components/card";
import { BaseCard } from "@/components/shared/card/base-card";
import { OrderInfo } from "./order-info";
import { CustomerInfo } from "./customer-info";
import { OrderItems } from "./order-items";
import { OrderPayment } from "./order-payment";
import { LinktoReceiptButton } from "../receipt/link-to-receipt-button";
import { LinkToPaymentButton } from "../payment/link-to-payment-button";
import { Banknote, Printer } from "lucide-react";
import { OrderUtil } from "@/utils/order.utils";

interface OrderDetailProps extends BaseCardProps {
  order: IOrder;
}

export function OrderDetail({ order, ...props }: OrderDetailProps) {
  return (
    <BaseCard
      {...props}
      content={
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Order Detail */}
            <section>
              <OrderInfo order={order} />
            </section>

            {/* Customer */}
            <section>
              <CustomerInfo order={order} />
            </section>
          </div>

          <Separator className="my-2" />

          {/* Order Items */}
          <section>
            <OrderItems order={order} />
          </section>

          <Separator className="my-2" />

          {/* Payment */}
          <section>
            <OrderPayment order={order} />
            {!OrderUtil.check.isCanceled(order) && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <LinkToPaymentButton variant={"outline"} order={order}>
                    <Banknote />
                    <span>การชำระเงิน</span>
                  </LinkToPaymentButton>
                  <LinktoReceiptButton variant={"outline"} order={order}>
                    <Printer />
                    <span>พิมพ์ใบเสร็จ</span>
                  </LinktoReceiptButton>
                </div>
              </>
            )}
          </section>
        </>
      }
    />
  );
}
