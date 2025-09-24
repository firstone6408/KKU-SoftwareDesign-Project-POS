"use client";

import { ModalProps } from "@/interfaces/components/modal";
import { IProduct } from "../../schemas/product.schema";
import { Modal } from "@/components/shared/modal/modal";
import { useForm } from "@/hooks/use-form";
import { updateStockProductAction } from "../../actions/product.action";
import { Form } from "@/utils/form.utils";
import { InputField } from "@/components/shared/field/input-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { SelectArrObjField } from "@/components/shared/field/select-field";
import { AdjustStockProductEnum } from "../../services/product.enum";
import { TransaleEnumUtil } from "@/utils/translate-enum.utils";
import { LabeledControl } from "@/components/shared/field/labeled-control";
import { FormatNumber } from "@/utils/format-number.utils";

interface UpdateStockProductModalProps extends ModalProps {
  product: IProduct | null;
}

export function UpdateStockProductModal({
  product,
  open,
  onClose,
  onOpenChange,
}: UpdateStockProductModalProps) {
  const { isPending, formAction, error, clearError, state } = useForm({
    action: updateStockProductAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      if (onClose) onClose();
    }
  }, [state, onClose]);

  if (!product) return null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="ปรับจำนวนสินค้า"
      description="ปรับจำนวนสินค้า (Stock) ในคลังสินค้า"
    >
      <Form
        action={formAction}
        onChange={clearError}
        className="space-y-3"
      >
        <input type="hidden" name="product-id" value={product.id} />
        <LabeledControl label="ประเภทการปรับจำนวนสินค้า" required>
          <SelectArrObjField
            name="adjust-stock-type"
            className="w-full"
            placeholder="เลือกประเภทการปรับจำนวนสินค้า"
            data={Object.values(AdjustStockProductEnum).map((s) => ({
              label: s.toString(),
              value: s.toString(),
            }))}
            defaultValue={AdjustStockProductEnum.INCREASE}
            translateFn={TransaleEnumUtil.translateAdjustStockProductEnum}
            required
          />
        </LabeledControl>
        <InputField
          label="จำนวนสินค้า"
          name="quantity"
          placeholder="กรอกจำนวนสินค้า"
          type="number"
          step="1"
          errorMessage={error.productStockLevel}
          required
          description={`จำนวนสินค้าคงเหลือปัจจุบัน: ${FormatNumber.number(
            product.stockLevel
          )}`}
        />
        <SubmitButton className="w-full" isPending={isPending} icon={Save}>
          บันทึก
        </SubmitButton>
      </Form>
    </Modal>
  );
}
