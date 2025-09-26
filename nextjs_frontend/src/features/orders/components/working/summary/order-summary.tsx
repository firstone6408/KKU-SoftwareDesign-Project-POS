import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Banknote, ShoppingCart } from "lucide-react";
import { IOrder } from "../../../schemas/order.schema";
import { OrderItemListCard } from "./order-item-list-card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { OrderDetailForm } from "./order-detail-form";
import { InputField } from "@/components/shared/field/input-field";
import { FormatNumber } from "@/utils/format-number.utils";
import { OrderUtil } from "@/utils/order.utils";
import { LinkToPaymentButton } from "../../payment/link-to-payment-button";

interface OrderSummaryProps {
  order: IOrder;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <Card className="space-y-2 h-[calc(120vh)]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xl">
              <ShoppingCart />
              <span>สรุปคำสั่งซื้อ</span>
            </div>
            <p className="text-current/50">
              รหัสรายการ: {order.orderCode}
            </p>
          </div>
          <Badge className="text-sm">จำนวน: {order.items.length}</Badge>
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col min-h-0 gap-2">
        {/* Item List */}
        <ScrollArea className="flex-1 overflow-auto">
          <OrderItemListCard order={order} />
        </ScrollArea>

        <Separator />

        {/* Summary */}
        <div className="flex-none space-y-2">
          <InputField
            label="ยอดรวมทั้งหมด"
            value={FormatNumber.number(order.totalAmount)}
            readOnly
            hiddenIcon
          />
          <InputField
            label="ยอดรวมคงเหลือ"
            value={FormatNumber.number(
              OrderUtil.calculate.actualRemainingAmount(order)
            )}
            readOnly
            hiddenIcon
          />
          <OrderDetailForm order={order} />
        </div>

        {/* Payment */}
        <LinkToPaymentButton order={order} asChild>
          <Banknote />
          <span>ชำระเงิน</span>
        </LinkToPaymentButton>
      </CardContent>
    </Card>
  );
}
