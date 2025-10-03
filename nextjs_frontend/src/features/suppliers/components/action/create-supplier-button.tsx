"use client";

import { useForm } from "@/hooks/use-form";
import { Form } from "@/utils/form.utils";
import { Plus } from "lucide-react";
import { createSupplierAction } from "../../actions/supplier.action";
import { InputField } from "@/components/shared/field/input-field";
import { TextareaField } from "@/components/shared/field/textarea-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { ButtonProps } from "@/interfaces/components/button";
import { Modal } from "@/components/shared/modal/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { useEffect } from "react";

export function CreateSupplierButton({ ...props }: ButtonProps) {
  const modal = useModal();
  const { formAction, isPending, error, clearError, state } = useForm({
    action: createSupplierAction,
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
        title="เพิ่มผู้จัดจำหน่าย"
        description="กรุณากรอกข้อมูลเพื่อเพิ่มผู้จัดจำหน่าย"
      >
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
      </Modal>
    </>
  );
}
