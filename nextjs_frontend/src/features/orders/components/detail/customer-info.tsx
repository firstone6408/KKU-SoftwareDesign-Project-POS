import { User } from "lucide-react";
import { IOrder } from "../../schemas/order.schema";

interface CustomerInfoProps {
  order: IOrder;
}

export function CustomerInfo({ order }: CustomerInfoProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <User />
        <span>ลูกค้า</span>
      </h2>
      <div>
        <div className="flex items-center gap-2">
          <p className="space-x-1">
            <span className="font-semibold">รหัสลูกค้า:</span>
            <span>{order.customer.customerCode}</span>
          </p>
          <span>/</span>
          <p className="space-x-1">
            <span className="font-semibold">ชื่อ:</span>
            <span>{order.customer.name}</span>
          </p>
        </div>
        <p className="space-x-1">
          <span className="font-semibold">ติดต่อ:</span>
          <span>{order.customer.contactInfo}</span>
        </p>
      </div>
    </div>
  );
}
