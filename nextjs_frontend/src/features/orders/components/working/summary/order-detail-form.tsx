"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { InputField } from "@/components/shared/field/input-field";
import { TextareaField } from "@/components/shared/field/textarea-field";
import { saveSummaryOrderAction } from "@/features/orders/actions/order.action";
import { IOrder } from "@/features/orders/schemas/order.schema";
import { useForm } from "@/hooks/use-form";
import { Form } from "@/utils/form.utils";
import { Save } from "lucide-react";

interface OrderDetailFormProps {
  order: IOrder;
}

export function OrderDetailForm({ order }: OrderDetailFormProps) {
  const { formAction, isPending, error, clearError } = useForm({
    action: saveSummaryOrderAction,
  });

  return (
    <Form action={formAction} onChange={clearError} className="space-y-2">
      <input type="hidden" name="order-id" defaultValue={order.id} />
      <InputField
        label="ส่วนลด"
        name="order-discount"
        placeholder="กรอกส่วนลด(ไม่จำเป็น)"
        type="number"
        step={0.01}
        defaultValue={order.discount}
        errorMessage={error.orderDiscount}
      />
      <InputField
        label="วันรับสินค้า"
        name="order-delivery-date"
        type="datetime-local"
        defaultValue={order.deliveryDate!}
        errorMessage={error.orderDeliveryDate}
        required
      />
      <TextareaField
        label="รายละเอียด"
        name="order-note"
        placeholder="กรอกรายละเอียดเพิ่มเติมเกี่ยวกับรายการนี้(ไม่จำเป็น)"
        defaultValue={order.note || ""}
        errorMessage={error.orderNote}
      />

      {order.items.length !== 0 && (
        <SubmitButton
          variant={"secondary"}
          className="w-full"
          icon={Save}
          isPending={isPending}
        >
          บันทึก
        </SubmitButton>
      )}
    </Form>
  );
}
