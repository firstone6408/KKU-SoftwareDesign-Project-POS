"use client";

import { SubmitButtonProps } from "@/interfaces/components/button";
import { IOrder } from "../schemas/order.schema";
import { deleteOrderAction } from "../actions/order.action";
import { useForm } from "@/hooks/use-form";
import { Form } from "@/utils/form.utils";
import { SubmitButton } from "@/components/shared/button/submit-button";

interface DeleteOrderButtonProps extends SubmitButtonProps {
  order: IOrder;
}

export function DeleteOrderButton({
  order,
  ...props
}: DeleteOrderButtonProps) {
  const { formAction, isPending } = useForm({
    action: deleteOrderAction,
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: "ลบการขาย",
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
