"use client";

import { useForm } from "@/hooks/use-form";
import { Form } from "@/utils/form.utils";
import { loginAction } from "../actions/auth.action";
import { InputField } from "@/components/shared/field/input-field";
import { CardContent, CardFooter } from "@/components/ui/card";
import { SubmitButton } from "@/components/shared/button/submit-button";

export function LoginForm() {
  const { formAction, isPending, error, clearError } = useForm({
    action: loginAction,
    redirectTo: "/",
  });
  return (
    <Form action={formAction} onChange={clearError} className="space-y-3">
      <CardContent>
        <InputField
          label="อีเมล์"
          name="email"
          errorMessage={error.email}
          type="email"
          required
        />
        <InputField label="รหัสผ่าน" name="password" type="password" />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {/* <AuthFooter type={type} /> */}
        <SubmitButton
          className="w-full cursor-pointer"
          isPending={isPending}
        >
          เข้าสู่ระบบ
        </SubmitButton>
      </CardFooter>
    </Form>
  );
}
