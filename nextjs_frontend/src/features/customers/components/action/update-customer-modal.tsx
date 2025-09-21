import { InputField } from "@/components/shared/field/input-field";
import { ICustomer } from "../../schemas/customer.schema";
import { Modal } from "@/components/shared/modal/modal";
import { ModalProps } from "@/interfaces/components/modal";
import { TextareaField } from "@/components/shared/field/textarea-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Save } from "lucide-react";
import { useForm } from "@/hooks/use-form";
import { updateCustomerAction } from "../../actions/customer.action";
import { Form } from "@/utils/form.utils";

interface UpdateCustomerModalProps extends ModalProps {
  customer: ICustomer | null;
}

export function UpdateCustomerModal({
  onOpenChange,
  open,
  customer,
}: UpdateCustomerModalProps) {
  const { formAction, isPending, error, clearError } = useForm({
    action: updateCustomerAction,
  });

  if (!customer) {
    return;
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="รายละเอียดลูกค้า"
      description=""
    >
      <Form
        action={formAction}
        className="space-y-2"
        onChange={clearError}
      >
        <input
          type="hidden"
          name="customer-id"
          defaultValue={customer.id}
        />
        <InputField
          label="ชื่อ"
          defaultValue={customer.name}
          name="customer-name"
          errorMessage={error.customerName}
          required
        />
        <TextareaField
          label="ติดต่อ"
          defaultValue={customer.contactInfo || ""}
          name="customer-contact-info"
          errorMessage={error.customerContactInfo}
        />

        <SubmitButton className="w-full" icon={Save} isPending={isPending}>
          บันทึก
        </SubmitButton>
      </Form>
    </Modal>
  );
}
