import { Badge } from "@/components/ui/badge";
import { IOrder } from "../schemas/order.schema";
import { TransaleEnumUtil } from "@/utils/translate-enum.utils";
import { OrderStatusEnum } from "../services/order.enum";

interface OrderStatusBadgeProps {
  order: IOrder;
}

export function OrderStatusBadge({ order }: OrderStatusBadgeProps) {
  return (
    <Badge
      variant={
        order.status === OrderStatusEnum.CANCELLED
          ? "destructive"
          : order.status === OrderStatusEnum.COMPLETED
          ? "default"
          : "outline"
      }
    >
      {TransaleEnumUtil.orderStatus(order.status)}
    </Badge>
  );
}
