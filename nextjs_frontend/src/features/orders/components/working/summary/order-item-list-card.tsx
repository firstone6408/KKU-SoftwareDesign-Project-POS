import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { IOrder } from "@/features/orders/schemas/order.schema";
import { FormatNumber } from "@/utils/format-number.utils";
import { OrderUtil } from "@/utils/order.utils";
import { DeleteItemInOrderButton } from "./update-item/delete-item-in-order-button";
import { UpdateItemAction } from "./update-item/update-item-action";

interface OrderItemListCardProps {
  order: IOrder;
}

export function OrderItemListCard({ order }: OrderItemListCardProps) {
  return (
    <div className="space-y-2">
      {order.items.map((item, index) => (
        <Card key={item.id} className="border-none bg-secondary/50">
          <CardHeader>
            <CardTitle>
              {index + 1}. {item.product.name}
            </CardTitle>
            <CardDescription>
              <div>Barcode: {item.product.barcode}</div>
              <div>รหัสสินค้า: {item.product.productCode}</div>
            </CardDescription>

            <CardAction>
              {/* Delete All */}
              <DeleteItemInOrderButton
                quantity={item.quantity}
                order={order}
                orderItem={item}
                variant={"destructive"}
                size={"sm"}
              />
            </CardAction>
          </CardHeader>

          {/* Summary */}
          <CardFooter className="flex justify-between items-center gap-2">
            <UpdateItemAction order={order} orderItem={item} />
            <p className="space-x-1">
              <span>ทั้งหมด</span>
              <span>
                {FormatNumber.number(OrderUtil.calculate.totalPrice(item))}
              </span>
              <span>บาท</span>
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
