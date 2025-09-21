"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/use-form";
import { createProductCategoryAction } from "../actions/product-category.action";
import { Button } from "@/components/ui/button";
import { BaseCardProps } from "@/interfaces/components/card";
import { BaseCard } from "@/components/shared/card/base-card";
import { Plus, Save } from "lucide-react";
import Form from "next/form";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { InputField } from "@/components/shared/field/input-field";

export function ProductCategoryForm({ ...props }: BaseCardProps) {
  const { formAction, isPending, error, clearError } = useForm({
    action: createProductCategoryAction,
  });
  return (
    <BaseCard
      headerTitleIcon={Plus}
      headerTitle="แบบฟอร์มเพิ่มปะรเภทสินค้า"
      {...props}
      content={
        <Form
          action={formAction}
          className="space-y-3"
          onChange={clearError}
        >
          <InputField
            label="ประเภทของสินค้า"
            name="product-category-name"
            errorMessage={error.productCategoryName}
            placeholder="กรอกประเภทของสินค้า"
            required
          />
          <SubmitButton
            className="w-full"
            icon={Save}
            isPending={isPending}
          >
            บันทึก
          </SubmitButton>
        </Form>
      }
    />
  );
}
