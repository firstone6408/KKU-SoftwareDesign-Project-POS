"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { IOrder } from "../../schemas/order.schema";
import { PanelRightClose, Printer, Trash, User } from "lucide-react";
import { FormatNumber } from "@/utils/format-number.utils";
import { OrderUtil } from "@/utils/order.utils";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { dateTime } from "@/utils/dateTime.utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeletePaymentButton } from "./delete-payment-button";
import { CloseOrderButton } from "../close-order-button";

interface OrderSummaryForPaymentProps {
  order: IOrder;
}

export function OrderSummaryForPayment({
  order,
}: OrderSummaryForPaymentProps) {
  const orderIsClosed = OrderUtil.check.isClosed(order);

  return (
    <div className="space-y-4">
      {/* Customer */}
      <section>
        <Card className="bg-secondary rounded-none">
          <CardContent>
            <div className="flex items-center gap-2">
              <User />
              <div className="flex flex-col">
                <CardTitle>{order.customer.name}</CardTitle>
                <CardDescription>
                  {order.customer.customerCode}
                </CardDescription>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Order items */}
      <section>
        <h2 className="text-2xl font-bold">รายการทั้งหมด</h2>
        <Separator className="my-2" />
        {/* Table Summary */}
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="grid grid-cols-4 gap-2 font-semibold">
            <span>ชื่อ</span>
            <span className="text-end">ราคา</span>
            <span className="text-end">จำนวน</span>
            <span className="text-end">รวม</span>
          </div>
          {/* Body */}
          <div className="grid grid-cols-4 gap-x-2 gap-y-4 text-current/75">
            {order.items.map((item) => (
              <React.Fragment key={item.id}>
                <span className="w-56">{item.product.name}</span>
                <span className="text-end">
                  {FormatNumber.number(item.unitPrice)}
                </span>
                <span className="text-end">
                  {FormatNumber.number(item.quantity)}
                </span>
                <span className="text-end">
                  {FormatNumber.number(
                    OrderUtil.calculate.totalPrice(item)
                  )}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Finance */}
      <section className="space-y-3">
        <div className="text-end">
          <div className="space-x-1">
            <span>ยอดรวมทั้งหมด:</span>
            <span>{FormatNumber.number(order.totalAmount)}</span>
            <span>บาท</span>
          </div>
          <div className="space-x-1">
            <span>ส่วนลด:</span>
            <span>{FormatNumber.number(order.discount)}</span>
            <span>บาท</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center gap-2 text-xl font-semibold">
          <span>ยอดคงเหลือ</span>
          <div className="space-x-1">
            <span>
              {FormatNumber.number(
                OrderUtil.calculate.actualRemainingAmount(order)
              )}
            </span>
            <span>บาท</span>
          </div>
        </div>

        <Separator />

        {order.saleInovice ? (
          <>
            {/* จ่ายแล้ว */}
            <div className="flex justify-between items-center gap-2">
              <div>
                <span className="font-semibold text-xl">จ่ายแล้ว</span>
                <p className="text-sm text-current/60">
                  (เมื่อ{" "}
                  {dateTime.formatDate(
                    new Date(order.saleInovice?.inoviceDate)
                  )}
                  )
                </p>
              </div>
              <div className="space-x-1 font-semibold text-xl">
                <span>
                  {FormatNumber.number(order.saleInovice.paidAmount)}
                </span>
                <span>บาท</span>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 text-xl font-semibold">
              <span>เงินทอน</span>
              <div className="space-x-1">
                <span>
                  {FormatNumber.number(order.saleInovice.changeAmount)}
                </span>
                <span>บาท</span>
              </div>
            </div>
            <Button asChild className="w-full" variant={"outline"}>
              <Link href={"#"}>
                <Printer />
                <span>Print Receipt</span>
              </Link>
            </Button>

            {!orderIsClosed && (
              <div className="grid grid-cols-2 gap-2">
                <DeletePaymentButton
                  className="w-full"
                  order={order}
                  variant={"destructive"}
                  icon={Trash}
                >
                  ลบการชำระเงิน
                </DeletePaymentButton>
                <CloseOrderButton
                  className="w-full"
                  order={order}
                  icon={PanelRightClose}
                >
                  ปิดการขาย
                </CloseOrderButton>
              </div>
            )}
          </>
        ) : (
          <div className="text-end">
            {/* ยังไม่จ่าย */}
            <span className="text-xl font-semibold text-red-500">
              *** ยังไม่ชำระเงิน ***
            </span>
          </div>
        )}
      </section>
    </div>
  );
}
