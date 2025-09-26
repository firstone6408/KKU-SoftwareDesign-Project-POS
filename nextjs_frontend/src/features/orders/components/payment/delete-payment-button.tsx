"use client";

import { SubmitButtonProps } from "@/interfaces/components/button";
import { IOrder } from "../../schemas/order.schema";
import { useForm } from "@/hooks/use-form";
import { deletePaymentOrderAction } from "../../actions/order.action";
import { Form } from "@/utils/form.utils";
import { SubmitButton } from "@/components/shared/button/submit-button";

interface DeletePaymentButtonProps extends SubmitButtonProps {
  order: IOrder;
}

export function DeletePaymentButton({
  order,
  ...props
}: DeletePaymentButtonProps) {
  const { formAction, isPending } = useForm({
    action: deletePaymentOrderAction,
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: "ลบการชำระเงิน",
        description:
          "การลบนี้เป็นการลบถาวรออกจากระบบ จะไม่สามารถกู้กลับคืนมาได้",
        confirmationTextRequired: "OK",
      }}
    >
      <input type="hidden" name="order-id" defaultValue={order.id} />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
