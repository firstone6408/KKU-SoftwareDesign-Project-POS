"use client";

import { useForm } from "@/hooks/use-form";
import { createProductCategoryAction } from "../../actions/product-category.action";
import Form from "next/form";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { InputField } from "@/components/shared/field/input-field";
import { ButtonProps } from "@/interfaces/components/button";
import { Modal } from "@/components/shared/modal/modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Save } from "lucide-react";

export function CreateProductCategoryButton({ ...props }: ButtonProps) {
  const modal = useModal();
  const { formAction, isPending, error, clearError, state } = useForm({
    action: createProductCategoryAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      if (modal.isOpen) {
        modal.setIsOpen(false);
        state.status = "expected-error";
      }
    }
  }, [modal, state]);

  return (
    <>
      {/* Button */}
      <Button {...props} onClick={() => modal.openModal(undefined)} />

      {/* Modal */}
      <Modal
        open={modal.isOpen}
        onOpenChange={modal.setIsOpen}
        title="เพิ่มประเภทของสินค้า"
        description="กรุณากรอกข้อมูลเพื่อเพิ่มประเภทของสินค้า"
      >
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
      </Modal>
    </>
  );
}
