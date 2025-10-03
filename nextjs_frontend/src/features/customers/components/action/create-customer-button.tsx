"use client";

import { useForm } from "@/hooks/use-form";
import { createCustomerAction } from "../../actions/customer.action";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Plus } from "lucide-react";
import { InputField } from "@/components/shared/field/input-field";
import { Form } from "@/utils/form.utils";
import { TextareaField } from "@/components/shared/field/textarea-field";
import { ButtonProps } from "@/interfaces/components/button";
import { Modal } from "@/components/shared/modal/modal";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function CreateCustomerButton({ ...props }: ButtonProps) {
  const modal = useModal();
  const { formAction, isPending, error, clearError, state } = useForm({
    action: createCustomerAction,
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
        title="เพิ่มลูกค้า"
        description="กรุณากรอกข้อมูลเพื่อเพิ่มลูกค้า"
      >
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
      </Modal>
    </>
  );
}
