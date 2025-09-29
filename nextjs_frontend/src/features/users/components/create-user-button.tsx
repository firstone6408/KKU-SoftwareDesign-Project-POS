"use client";

import { Modal } from "@/components/shared/modal/modal";
import { Button } from "@/components/ui/button";
import { useForm } from "@/hooks/use-form";
import { useModal } from "@/hooks/use-modal";
import { ButtonProps } from "@/interfaces/components/button";
import { createUserAction } from "../actions/user.action";
import { Form } from "@/utils/form.utils";
import { InputField } from "@/components/shared/field/input-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { UserRoleSelect } from "./user-role-select";
import { UserRoleEnum } from "../services/user.enum";

export function CreateUserButton({ ...props }: ButtonProps) {
  const modal = useModal();
  const { formAction, isPending, error, clearError, state } = useForm({
    action: createUserAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      modal.closeModal();
      state.status = "expected-error";
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
        title="แบบฟอร์มเพิ่มพนักงาน"
        description=""
      >
        <Form
          action={formAction}
          onChange={clearError}
          className="space-y-2"
        >
          <InputField
            label="ชื่อ"
            placeholder="ชื่อของพนักงาน"
            errorMessage={error.userName}
            name="user-name"
            required
          />
          <InputField
            label="อีเมล์"
            placeholder="อีเมล์ของพนักงาน"
            errorMessage={error.userEmail}
            name="user-email"
            type="email"
            required
          />
          <UserRoleSelect
            label="ตำแหน่ง"
            className="w-full"
            defaultValue={UserRoleEnum.SELLER}
            errorMessage={error.userRole}
            name="user-role"
            required
          />
          <InputField
            label="รหัสผ่าน"
            placeholder="รหัสผ่านของพนักงาน"
            errorMessage={error.userPassword}
            name="user-password"
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
