import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder } from "../../schemas/order.schema";
import { FormatNumber } from "@/utils/format-number.utils";
import { OrderUtil } from "@/utils/order.utils";
import { List } from "lucide-react";

interface OrderItemsProps {
  order: IOrder;
}

export function OrderItems({ order }: OrderItemsProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <List />
        <span>รายการสินค้า</span>
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-end">ลำดับ</TableHead>
            <TableHead>ผู้จัดจำหน่าย</TableHead>
            <TableHead>ประเภท</TableHead>
            <TableHead>ชื่อ</TableHead>
            <TableHead className="text-end">จำนวน</TableHead>
            <TableHead className="text-end">ราคา</TableHead>
            <TableHead className="text-end">ราคารวม</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-end">{index + 1}</TableCell>
              <TableCell>{item.product.supplier.name}</TableCell>
              <TableCell>{item.product.category.name}</TableCell>
              <TableCell>{item.product.name}</TableCell>
              <TableCell className="text-end">
                {FormatNumber.number(item.quantity)}
              </TableCell>
              <TableCell className="text-end">
                {FormatNumber.number(item.unitPrice)}
              </TableCell>
              <TableCell className="text-end">
                {FormatNumber.number(OrderUtil.calculate.totalPrice(item))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
