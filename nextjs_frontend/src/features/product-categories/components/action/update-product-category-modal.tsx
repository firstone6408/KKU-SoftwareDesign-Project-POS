import { ModalProps } from "@/interfaces/components/modal";
import { IProductCategory } from "../../schemas/product-category.schema";
import { Modal } from "@/components/shared/modal/modal";
import { useForm } from "@/hooks/use-form";
import { updateProductCategoryAction } from "../../actions/product-category.action";
import { useEffect } from "react";
import { Form } from "@/utils/form.utils";
import { InputField } from "@/components/shared/field/input-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Save } from "lucide-react";

interface UpdateProductCategoryModal extends ModalProps {
  productCategory: IProductCategory | null;
}

export function UpdateProductCategoryModal({
  productCategory,
  open,
  onOpenChange,
  onClose,
}: UpdateProductCategoryModal) {
  const { formAction, isPending, error, clearError, state } = useForm({
    action: updateProductCategoryAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      if (onClose) {
        onClose();
      }
    }
  }, [state, onClose]);

  if (!productCategory) {
    return;
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="แก้ไขรายละเอียดประเภทสินค้า"
      description=""
    >
      <Form
        action={formAction}
        className="space-y-3"
        onChange={clearError}
      >
        <input
          type="hidden"
          name="product-category-id"
          defaultValue={productCategory.id}
        />
        <InputField
          label="ชื่อ"
          defaultValue={productCategory.name}
          name="product-category-name"
          errorMessage={error.productCategoryName}
          required
        />
        <SubmitButton className="w-full" icon={Save} isPending={isPending}>
          บันทึก
        </SubmitButton>
      </Form>
    </Modal>
  );
}
