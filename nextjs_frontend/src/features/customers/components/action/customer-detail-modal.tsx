import { InputField } from "@/components/shared/field/input-field";
import { ICustomer } from "../../schemas/customer.schema";
import { Modal } from "@/components/shared/modal/modal";
import { ModalProps } from "@/interfaces/components/modal";
import { TextareaField } from "@/components/shared/field/textarea-field";
import { dateTime } from "@/utils/dateTime.utils";

interface CustomerDetailModalProps extends ModalProps {
  customer: ICustomer | null;
}

export function CustomerDetailModal({
  onOpenChange,
  open,
  customer,
}: CustomerDetailModalProps) {
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
      <div className="space-y-2">
        <InputField
          label="ชื่อ"
          defaultValue={customer.name}
          readOnly
          hiddenIcon
        />
        <TextareaField
          label="ติดต่อ"
          defaultValue={customer.contactInfo || ""}
          readOnly
          hiddenIcon
        />
        <div className="flex gap-2">
          <span className="w-full">
            <InputField
              label="วันที่สร้าง"
              defaultValue={dateTime.formatDate(
                new Date(customer.createdAt)
              )}
              readOnly
              hiddenIcon
            />
          </span>
          <span className="w-full">
            <InputField
              label="วันที่แก้ไขล่าสุด"
              defaultValue={dateTime.formatDate(
                new Date(customer.updatedAt)
              )}
              readOnly
              hiddenIcon
            />
          </span>
        </div>
      </div>
    </Modal>
  );
}
