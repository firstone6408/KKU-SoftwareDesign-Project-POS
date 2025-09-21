"use client";

import { ModalProps } from "@/interfaces/components/modal";
import { ISupplier } from "../../schemas/supplier.schema";
import { Modal } from "@/components/shared/modal/modal";
import { Form } from "@/utils/form.utils";
import { useForm } from "@/hooks/use-form";
import { updateSupplierAction } from "../../actions/supplier.action";
import { InputField } from "@/components/shared/field/input-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Save } from "lucide-react";
import { useEffect } from "react";

interface UpdateSupplierModalProps extends ModalProps {
  supplier: ISupplier | null;
}

export function UpdateSupplierModal({
  supplier,
  open,
  onOpenChange,
  onClose,
}: UpdateSupplierModalProps) {
  const { state, formAction, isPending, error, clearError } = useForm({
    action: updateSupplierAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      if (onClose) {
        onClose();
      }
    }
  }, [state, onClose]);

  if (!supplier) {
    return;
  }
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="แก้ไขรายละเอียดผู้จัดจำหน่าย"
      description=""
    >
      <Form
        action={formAction}
        onChange={clearError}
        className="space-y-3"
      >
        <input
          type="hidden"
          name="supplier-id"
          defaultValue={supplier.id}
        />
        <InputField
          label="ชื่อ"
          defaultValue={supplier.name}
          name="supplier-name"
          errorMessage={error.supplierName}
          required
        />
        <InputField
          label="ติดต่อ"
          defaultValue={supplier.contactInfo || ""}
          name="supplier-contact-info"
          errorMessage={error.supplierContactInfo}
        />
        <SubmitButton className="w-full" icon={Save} isPending={isPending}>
          บันทึก
        </SubmitButton>
      </Form>
    </Modal>
  );
}
