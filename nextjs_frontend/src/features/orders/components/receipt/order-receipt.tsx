"use client";

import { AppLogo } from "@/components/layouts/main/app-logo";
import { IOrder } from "../../schemas/order.schema";
import { dateTime } from "@/utils/dateTime.utils";
import { Separator } from "@/components/ui/separator";
import { FormatNumber } from "@/utils/format-number.utils";
import { OrderUtil } from "@/utils/order.utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransaleEnumUtil } from "@/utils/translate-enum.utils";
import { usePrint } from "@/hooks/use-print";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useFileDownload } from "@/hooks/use-file-download";
import { Download, Printer } from "lucide-react";

interface OrderReceiptProps {
  order: IOrder;
}

export function OrderReceipt({ order }: OrderReceiptProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { handlePrint } = usePrint({ printTargetRef: contentRef });
  const { downloadHtmlToPDF } = useFileDownload({
    downloadTargetRef: contentRef,
  });

  const handleDownload = async () => {
    await downloadHtmlToPDF({
      fileName: `ใบเสร็จรับเงิน_${order.customer.name}_${
        order.orderCode
      }_d-${dateTime.dayjs(new Date()).format("YYYY-MM-DD/HH:mm:ss")}`,
      configStyle: {
        width: 400,
        height: 600,
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Content */}
      <div className="w-[400px] p-4 flex flex-col gap-3" ref={contentRef}>
        {/* Logo */}
        <section className="flex flex-col justify-center items-center gap-1">
          <AppLogo />
          <p>ใบเสร็จรับเงิน</p>
        </section>

        {/* Detail */}
        <section>
          <p>รหัสการสั่งซื้อ: {order.orderCode}</p>
          <p>วันที่ออกใบเสร็จ {dateTime.formatDate(new Date())}</p>
          <p>พนักงานขาย: {order.createdBy.name}</p>
        </section>

        <Separator />

        {/* Items */}
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Qty</TableHead>
                <TableHead>Desc</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {FormatNumber.number(item.quantity)}
                  </TableCell>
                  <TableCell className="break-words whitespace-pre-line max-w-[120px]">
                    {item.product.name}
                  </TableCell>
                  <TableCell className="text-right">
                    {FormatNumber.number(
                      OrderUtil.calculate.totalPrice(item)
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <Separator />

        {/* Summary */}
        <section className="flex justify-between items-center">
          <div className="space-x-2">
            <span>จำนวน</span>
            <span>
              {FormatNumber.number(
                OrderUtil.calculate.totalQuantity(order)
              )}
            </span>
            <span>ชิ้น</span>
          </div>
          <div className="space-x-2">
            <span>มูลค่า</span>
            <span>
              {FormatNumber.number(
                OrderUtil.calculate.actualRemainingAmount(order)
              )}
            </span>
          </div>
        </section>

        {order.saleInovice && (
          <>
            <Separator />
            {/* Payment */}
            <section>
              <p className="flex justify-between">
                <span>จำนวนเงินที่ชำระ</span>
                <span>
                  {FormatNumber.number(order.saleInovice.paidAmount)}
                </span>
              </p>
              <p className="flex justify-between">
                <span>เงินทอน</span>
                <span>
                  {FormatNumber.number(order.saleInovice.changeAmount)}
                </span>
              </p>
              <p className="flex justify-between">
                <span>วิธีการชำระ</span>
                <span>
                  {TransaleEnumUtil.orderPaymentMethod(
                    order.saleInovice.paymentMethod
                  )}
                </span>
              </p>
            </section>
          </>
        )}

        <Separator />

        {/* Contact */}

        <section className="text-center">
          <p>สั่งซื้อเพิ่มเติมได้ที่ โทร. 0-000-0000</p>
          <p>Line@ : @kkupos</p>
        </section>
      </div>

      {/* Action */}
      <div className="flex items-center gap-2">
        <Button onClick={handleDownload}>
          <Download />
          <span>Download</span>
        </Button>
        <Button onClick={handlePrint}>
          <Printer />
          <span>Print</span>
        </Button>
      </div>
    </div>
  );
}
