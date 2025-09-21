"use client";

import { SubmitButtonProps } from "@/interfaces/components/button";
import { ICustomer } from "../../schemas/customer.schema";
import { useForm } from "@/hooks/use-form";
import { deleteCustomerAction } from "../../actions/customer.action";
import { Form } from "@/utils/form.utils";
import { SubmitButton } from "@/components/shared/button/submit-button";

interface DeleteCustomerButtonProps extends SubmitButtonProps {
  customer: ICustomer;
}

export function DeleteCustomerButton({
  customer,
  ...props
}: DeleteCustomerButtonProps) {
  const { formAction, isPending } = useForm({
    action: deleteCustomerAction,
    mode: "controlled",
  });
  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: `ลบ"${customer.name}"`,
        description: "ลูกค้าคนนี้จะถูกลบออกจากระบบถาวร",
      }}
    >
      <input type="hidden" name="customer-id" value={customer.id} />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
