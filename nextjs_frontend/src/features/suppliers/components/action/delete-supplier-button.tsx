"use client";

import { SubmitButtonProps } from "@/interfaces/components/button";
import { ISupplier } from "../../schemas/supplier.schema";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { useForm } from "@/hooks/use-form";
import { deleteSupplierAction } from "../../actions/supplier.action";
import { Form } from "@/utils/form.utils";

interface DeleteSupplierButtonProps extends SubmitButtonProps {
  supplier: ISupplier;
}

export function DeleteSupplierButton({
  supplier,
  ...props
}: DeleteSupplierButtonProps) {
  const { formAction, isPending } = useForm({
    action: deleteSupplierAction,
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: `ลบผู้จัดจำหน่าย "${supplier.name}"`,
      }}
    >
      <input type="hidden" name="supplier-id" defaultValue={supplier.id} />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
