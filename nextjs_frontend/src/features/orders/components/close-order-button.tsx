"use client";

import { SubmitButtonProps } from "@/interfaces/components/button";
import { IOrder } from "../schemas/order.schema";
import { useForm } from "@/hooks/use-form";
import { closeOrderAction } from "../actions/order.action";
import { Form } from "@/utils/form.utils";
import { SubmitButton } from "@/components/shared/button/submit-button";

interface CloseOrderButtonProps extends SubmitButtonProps {
  order: IOrder;
}

export function CloseOrderButton({
  order,
  ...props
}: CloseOrderButtonProps) {
  const { formAction, isPending } = useForm({
    action: closeOrderAction,
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: "ปิดการขาย",
        description:
          "หลังจากปิดการขายแล้วจะไม่สามารถแก้ไขรายการนี้ได้อีกต่อไป",
        confirmationTextRequired: "OK",
      }}
    >
      <input type="hidden" name="order-id" defaultValue={order.id} />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
