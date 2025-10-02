import { FormatNumber } from "@/utils/format-number.utils";
import { IOrder } from "../../schemas/order.schema";
import { OrderUtil } from "@/utils/order.utils";
import { dateTime } from "@/utils/dateTime.utils";
import { SlipImageButton } from "./slip-image-button";
import { Banknote, ImageIcon } from "lucide-react";
import { TransaleEnumUtil } from "@/utils/translate-enum.utils";

interface OrderPaymentProps {
  order: IOrder;
}

export function OrderPayment({ order }: OrderPaymentProps) {
  if (!order.saleInovice) return;

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Banknote />
        <span>รายละเอียดการชําระ</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-20">
        {/* Summary */}
        <section className="flex flex-col">
          <p className="flex justify-between items-center gap-2">
            <span>ยอดรวมทั้งหมด</span>
            <span className="space-x-1">
              <span>
                {FormatNumber.number(order.saleInovice.totalAmount)}
              </span>
              <span>บาท</span>
            </span>
          </p>
          <p className="flex justify-between items-center gap-2">
            <span>ส่วนลด</span>
            <span className="space-x-1">
              <span>
                {FormatNumber.number(order.saleInovice.discount)}
              </span>
              <span>บาท</span>
            </span>
          </p>
          <p className="flex justify-between items-center gap-2">
            <span>ยอดคงเหลือ</span>
            <span className="space-x-1">
              <span>
                {FormatNumber.number(
                  OrderUtil.calculate.actualRemainingAmount(order)
                )}
              </span>
              <span>บาท</span>
            </span>
          </p>
        </section>

        {/* Payment */}
        <section>
          <p className="flex justify-between items-center gap-2">
            <span>วันที่ชำระ</span>
            <span>
              {dateTime.formatDate(
                new Date(order.saleInovice.inoviceDate)
              )}
            </span>
          </p>
          <p className="flex justify-between items-center gap-2">
            <span>ยอดที่จ่าย</span>
            <span className="space-x-1">
              <span>
                {FormatNumber.number(order.saleInovice.paidAmount)}
              </span>
              <span>บาท</span>
            </span>
          </p>
          <p className="flex justify-between items-center gap-2">
            <span>เงินทอน</span>
            <span className="space-x-1">
              <span>
                {FormatNumber.number(order.saleInovice.changeAmount)}
              </span>
              <span>บาท</span>
            </span>
          </p>
          <p className="flex justify-between items-center gap-2">
            <span>วิธีการชำระ</span>
            <span>
              {TransaleEnumUtil.orderPaymentMethod(
                order.saleInovice.paymentMethod
              )}
            </span>
          </p>
          <div className="flex justify-between items-center gap-2">
            <span>หลักฐานการชำระ</span>
            <SlipImageButton
              variant={"secondary"}
              size={"icon"}
              order={order}
            >
              <ImageIcon />
            </SlipImageButton>
          </div>
        </section>
      </div>
    </div>
  );
}
