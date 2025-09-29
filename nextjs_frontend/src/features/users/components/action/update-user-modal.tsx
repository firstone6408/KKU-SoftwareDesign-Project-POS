"use client";

import { ModalProps } from "@/interfaces/components/modal";
import { IUser } from "../../schemas/user.schema";
import { Modal } from "@/components/shared/modal/modal";
import { useForm } from "@/hooks/use-form";
import { updateUserAction } from "../../actions/user.action";
import { Form } from "@/utils/form.utils";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Save } from "lucide-react";
import { InputField } from "@/components/shared/field/input-field";
import { UserRoleSelect } from "../user-role-select";
import { useEffect } from "react";

interface UpdateUserModalProps extends ModalProps {
  user: IUser | null;
}

export function UpdateUserModal({
  user,
  open,
  onOpenChange,
  onClose,
}: UpdateUserModalProps) {
  const { formAction, isPending, error, clearError, state } = useForm({
    action: updateUserAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      if (onClose) {
        onClose();
        state.status = "expected-error";
      }
    }
  }, [onClose, state]);

  if (!user) return null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="แก้ไขขข้อมูลพนักงาน"
      description=""
    >
      <Form
        action={formAction}
        onChange={clearError}
        className="space-y-2"
      >
        <input type="hidden" name="user-id" defaultValue={user.id} />

        <InputField
          label="ชื่อ"
          placeholder="ชื่อของพนักงาน"
          defaultValue={user.name}
          errorMessage={error.userName}
          name="user-name"
          required
        />
        <InputField
          label="อีเมล์"
          placeholder="อีเมล์ของพนักงาน"
          defaultValue={user.email}
          errorMessage={error.userEmail}
          name="user-email"
          type="email"
          required
        />
        <UserRoleSelect
          label="ตำแหน่ง"
          className="w-full"
          defaultValue={user.role}
          errorMessage={error.userRole}
          name="user-role"
          required
        />
        <InputField
          label="รหัสผ่าน"
          placeholder="รหัสผ่านของพนักงาน"
          errorMessage={error.userPassword}
          name="user-password"
        />

        <SubmitButton className="w-full" icon={Save} isPending={isPending}>
          บันทึก
        </SubmitButton>
      </Form>
    </Modal>
  );
}
