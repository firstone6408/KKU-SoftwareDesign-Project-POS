"use client";

import { useForm } from "@/hooks/use-form";
import { SubmitButtonProps } from "@/interfaces/components/button";
import { logoutAction } from "../actions/auth.action";
import { Form } from "@/utils/form.utils";
import { SubmitButton } from "@/components/shared/button/submit-button";

export function LogoutButton({ ...props }: SubmitButtonProps) {
  const { formAction, isPending } = useForm({
    action: logoutAction,
    redirectTo: "/auth/sign-in",
  });
  return (
    <Form action={formAction}>
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
