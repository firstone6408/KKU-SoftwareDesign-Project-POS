"use client";

import { BaseCard } from "@/components/shared/card/base-card";
import { useForm } from "@/hooks/use-form";
import { BaseCardProps } from "@/interfaces/components/card";
import { Form } from "@/utils/form.utils";
import { Plus } from "lucide-react";
import { createSupplierAction } from "../actions/supplier.action";
import { InputField } from "@/components/shared/field/input-field";
import { TextareaField } from "@/components/shared/field/textarea-field";
import { SubmitButton } from "@/components/shared/button/submit-button";

export function SupplierForm({ ...props }: BaseCardProps) {
  const { formAction, isPending, error, clearError } = useForm({
    action: createSupplierAction,
  });
  return (
    <BaseCard
      {...props}
      headerTitleIcon={Plus}
      headerTitle="แบบฟอร์มเพิ่มผู้จัดจำหน่าย"
      content={
        <Form
          action={formAction}
          className="space-y-3"
          onChange={clearError}
        >
          <InputField
            label="ชื่อ"
            name="supplier-name"
            placeholder="กรอกชื่อผู้จัดจำหน่าย"
            errorMessage={error.supplierName}
            required
          />
          <TextareaField
            label="ติดต่อ"
            name="supplier-contact-info"
            placeholder="กรอกการติดต่อกับผู้จัดจำหน่าย"
            errorMessage={error.supplierContactInfo}
          />

          <SubmitButton
            className="w-full"
            icon={Plus}
            isPending={isPending}
          >
            บันทึก
          </SubmitButton>
        </Form>
      }
    />
  );
}
