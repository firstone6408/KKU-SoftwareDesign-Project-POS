"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { InputField } from "@/components/shared/field/input-field";
import { Button } from "@/components/ui/button";
import { paymentOrderAction } from "@/features/orders/actions/order.action";
import { IOrder } from "@/features/orders/schemas/order.schema";
import { OrderPaymentMethodEnum } from "@/features/orders/services/order.enum";
import { useForm } from "@/hooks/use-form";
import { useImageUploadField } from "@/hooks/use-image-field";
import { Form } from "@/utils/form.utils";
import { FormatNumber } from "@/utils/format-number.utils";
import { OrderUtil } from "@/utils/order.utils";
import { TransaleEnumUtil } from "@/utils/translate-enum.utils";
import { Banknote } from "lucide-react";
import { useState } from "react";
import { PaymentSlipDetailButton } from "./payment-slip-detail-button";

interface PaymentFormProps {
  order: IOrder;
}

export function PaymentForm({ order }: PaymentFormProps) {
  const actualRemainingAmount =
    OrderUtil.calculate.actualRemainingAmount(order);
  const orderIsClosed = OrderUtil.check.isClosed(order);

  const { formAction, isPending, clearError, error } = useForm({
    action: paymentOrderAction,
    mode: "controlled",
  });

  const { ImageUploadField, handleImageChange, ...upload } =
    useImageUploadField();

  const [selectedPayment, SetSelectedPayment] = useState<
    OrderPaymentMethodEnum | undefined
  >(order.saleInovice?.paymentMethod || undefined);
  const [paidAmount, setPaidAmount] = useState<number>(
    order.saleInovice?.paidAmount || 0
  );
  const [changeAmount, setChangeAmount] = useState<number>(
    order.saleInovice?.changeAmount || 0
  );

  const onEnterPaidAmount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaidAmount(Number(event.target.value));
    setChangeAmount(Number(event.target.value) - actualRemainingAmount);
  };

  return (
    <Form
      action={formAction}
      className="space-y-6"
      onChange={clearError}
      confirmConfig={{
        title: "ชำระเงินสำหรับคำสั่งซื้อ",
        confirmationTextRequired: "OK",
        onBeforeConfirm: ({ formData }) => {
          if (!selectedPayment) {
            return {
              message: "ยังไม่ได้เลือกวิธีการชำระเงิน",
            };
          }
          if (upload.images.length <= 0) {
            return {
              message: "ยังไม่ได้อัปโหลดหลักฐานการชำระเงิน",
            };
          }

          formData.append("order-id", order.id);
          formData.append("order-discount", order.discount.toString());
          formData.append("order-payment-method", selectedPayment);
          formData.append("order-slip-image", upload.images[0]);
          return formData;
        },
      }}
    >
      {/* Input Paid Amount */}
      <section className="space-y-2">
        <h2 className="text-2xl font-bold">การชำระเงิน</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-full">
            <InputField
              label="ยอดรวมเงินที่ต้องจ่าย"
              defaultValue={FormatNumber.number(actualRemainingAmount)}
              readOnly
              hiddenIcon
            />
          </div>
          <InputField
            label="จำนวนเงิน"
            name="order-paid-amount"
            placeholder="จำนวนเงินที่ลูกค้าจ่าย"
            errorMessage={error.orderPaidAmount}
            defaultValue={order.saleInovice?.paidAmount}
            onChange={(event) => onEnterPaidAmount(event)}
            type="number"
            step={0.01}
            required
            readOnly={orderIsClosed}
            hiddenIcon={orderIsClosed}
          />

          <InputField
            label="เงินทอน"
            value={FormatNumber.number(changeAmount)}
            readOnly
            hiddenIcon
          />
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        {/* Payment Method */}
        <section className="space-y-2">
          <h2 className="text-2xl font-bold">วิธีการชำระเงิน</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.values(OrderPaymentMethodEnum).map((payment) => (
              <Button
                className="cursor-pointer"
                variant={
                  selectedPayment && selectedPayment === payment
                    ? "default"
                    : "outline"
                }
                size={"lg"}
                type="button"
                key={payment}
                onClick={() => SetSelectedPayment(payment)}
                disabled={orderIsClosed}
              >
                {TransaleEnumUtil.orderPaymentMethod(payment)}
              </Button>
            ))}
          </div>
        </section>

        {/* Upload Slip Image */}
        <section>
          <h2 className="text-2xl font-bold">อัปโหลดหลักฐานการชำระเงิน</h2>
          <ImageUploadField
            label=""
            className="h-40 overflow-hidden"
            onImageChange={handleImageChange}
            existingImages={
              order.saleInovice
                ? [
                    {
                      id: order.saleInovice.slipImageUrl!,
                      isMain: true,
                      url: order.saleInovice.slipImageUrl!,
                    },
                  ]
                : []
            }
            disabled={orderIsClosed}
          />
          {order.saleInovice?.slipImageUrl && (
            <PaymentSlipDetailButton
              className="w-full"
              variant={"secondary"}
              type="button"
              order={order}
            >
              หลักฐานการชำระ
            </PaymentSlipDetailButton>
          )}
        </section>
      </div>

      {/* Invoice Date */}
      <InputField
        label="วันที่ชำระเงิน"
        name="order-inovice-date"
        type="datetime-local"
        defaultValue={order.saleInovice?.inoviceDate}
        required
        readOnly={orderIsClosed}
        hiddenIcon={orderIsClosed}
      />

      {!orderIsClosed && (
        <div>
          {paidAmount < actualRemainingAmount && (
            <p className="text-red-500">
              {/* ** จำนวนเงินที่ต้องขำระ ต้องมีมากกว่า ยอดรวมเงินที่ต้องจ่าย */}
            </p>
          )}
          <SubmitButton
            className="w-full"
            isPending={isPending}
            icon={Banknote}
            disabled={isPending || paidAmount < actualRemainingAmount}
          >
            ยืนยันการชำระเงิน
          </SubmitButton>
        </div>
      )}
    </Form>
  );
}
