"use client";

import { useForm } from "@/hooks/use-form";
import { createCustomerAction } from "../actions/customer.action";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Plus } from "lucide-react";
import { InputField } from "@/components/shared/field/input-field";
import { Form } from "@/utils/form.utils";
import { BaseCardProps } from "@/interfaces/components/card";
import { BaseCard } from "@/components/shared/card/base-card";
import { TextareaField } from "@/components/shared/field/textarea-field";

export function CustomerForm({ ...props }: BaseCardProps) {
  const { formAction, isPending, error, clearError } = useForm({
    action: createCustomerAction,
  });

  return (
    <BaseCard
      headerTitleIcon={Plus}
      headerTitle="แบบฟอร์มเพิ่มลูกค้า"
      {...props}
      content={
        <Form
          action={formAction}
          className="space-y-3"
          onChange={clearError}
        >
          <InputField
            label="ชื่อ"
            name="customer-name"
            placeholder="กรอกชื่อลูกค้า"
            errorMessage={error.name}
            required
          />
          <TextareaField
            label="ติดต่อ"
            name="customer-contact-info"
            placeholder="กรอกรายละเอียดการติดต่อกับลูกค้า"
            errorMessage={error.contactInfo}
            required
          />

          <SubmitButton
            className="w-full"
            isPending={isPending}
            icon={Plus}
          >
            บันทึก
          </SubmitButton>
        </Form>
      }
    />
  );
}
