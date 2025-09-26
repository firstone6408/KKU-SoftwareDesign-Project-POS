import { BaseCardProps } from "@/interfaces/components/card";
import { IOrder } from "../schemas/order.schema";
import { BaseCard } from "@/components/shared/card/base-card";
import { List } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateTime } from "@/utils/dateTime.utils";
import { OrderAction } from "./order-action";
import { FormatNumber } from "@/utils/format-number.utils";
import { OrderUtil } from "@/utils/order.utils";
import { TransaleEnumUtil } from "@/utils/translate-enum.utils";

interface OrderListTableProps extends BaseCardProps {
  orders: IOrder[];
}

export function OrderListTable({ orders, ...props }: OrderListTableProps) {
  return (
    <BaseCard
      {...props}
      headerTitleIcon={List}
      headerTitle="รายการคำสั่งซื้อทั้งหมด"
      content={
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-end">ลำดับ</TableHead>
              <TableHead>รหัส</TableHead>
              <TableHead>ชื่อลูกค้า</TableHead>
              <TableHead className="text-end">ยอดคงเหลือ</TableHead>
              <TableHead>สถาณะ</TableHead>
              <TableHead>วันที่สร้าง</TableHead>
              <TableHead>สร้างโดย</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell className="text-end">{index + 1}</TableCell>
                <TableCell>{order.orderCode}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell className="text-end">
                  {FormatNumber.number(
                    OrderUtil.calculate.actualRemainingAmount(order)
                  )}
                </TableCell>
                <TableCell>
                  {TransaleEnumUtil.orderStatus(order.status)}
                </TableCell>
                <TableCell>
                  {dateTime.formatDate(new Date(order.orderDate))}
                </TableCell>
                <TableCell>{order.createdBy.name}</TableCell>
                <TableCell className="flex justify-center">
                  <OrderAction order={order} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    />
  );
}
