"use client";

import { SubmitButtonProps } from "@/interfaces/components/button";
import { IOrder } from "../schemas/order.schema";
import { useForm } from "@/hooks/use-form";
import { cancelOrderAction } from "../actions/order.action";
import { Form } from "@/utils/form.utils";
import { SubmitButton } from "@/components/shared/button/submit-button";

interface CancelOrderButtonProps extends SubmitButtonProps {
  order: IOrder;
}

export function CancelOrderButton({
  order,
  ...props
}: CancelOrderButtonProps) {
  const { formAction, isPending } = useForm({
    action: cancelOrderAction,
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: "ยกเลิกการขาย",
        description:
          "การยกเลิกนี้เป็นการยกเลิก จะไม่สามารถกู้กลับคืนมาได้",
        confirmationTextRequired: "OK",
      }}
    >
      <input type="hidden" name="order-id" defaultValue={order.id} />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
