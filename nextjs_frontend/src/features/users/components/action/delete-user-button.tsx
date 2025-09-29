"use client";

import { SubmitButtonProps } from "@/interfaces/components/button";
import { IUser } from "../../schemas/user.schema";
import { useForm } from "@/hooks/use-form";
import { deleteUserAction } from "../../actions/user.action";
import { Form } from "@/utils/form.utils";
import { SubmitButton } from "@/components/shared/button/submit-button";

interface DeleteUserButtonProps extends SubmitButtonProps {
  user: IUser;
}

export function DeleteUserButton({
  user,
  ...props
}: DeleteUserButtonProps) {
  const { formAction, isPending } = useForm({
    action: deleteUserAction,
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: `ลบพนักงาน "${user.name}"`,
        description: "การลบนี้เป็นการลบถาวร จะไม่สามารถกู้ข้อมูลกลับมาได้",
        confirmationTextRequired: "OK",
      }}
    >
      <input type="hidden" name="user-id" defaultValue={user.id} />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
