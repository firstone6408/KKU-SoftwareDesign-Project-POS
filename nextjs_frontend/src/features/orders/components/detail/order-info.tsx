import { dateTime } from "@/utils/dateTime.utils";
import { IOrder } from "../../schemas/order.schema";
import { ReceiptText } from "lucide-react";
import { OrderStatusBadge } from "../order-status-bagde";

interface OrderInfoProps {
  order: IOrder;
}

export function OrderInfo({ order }: OrderInfoProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <ReceiptText />
        <span>รายละเอียด</span>
      </h2>
      <div>
        <div className="flex items-center gap-2">
          <p className="space-x-1">
            <span className="font-semibold">รหัสคำสั่งซื้อ:</span>
            <span>{order.orderCode}</span>
          </p>
          <span>/</span>
          <p className="space-x-1">
            <span className="font-semibold">พนักงาน:</span>
            <span>{order.createdBy.name}</span>
          </p>
        </div>
        <p className="space-x-1">
          <span className="font-semibold">วันที่สร้างคำสั่งซื้อ:</span>
          <span>{dateTime.formatDate(new Date(order.orderDate))}</span>
        </p>
        <p className="space-x-1">
          <span className="font-semibold">สถานะ:</span>
          <span>
            <OrderStatusBadge order={order} />
          </span>
        </p>
      </div>
    </div>
  );
}
