"use client";

import { useForm } from "@/hooks/use-form";
import { Form } from "@/utils/form.utils";
import { Plus } from "lucide-react";
import { createProductAction } from "../actions/product.action";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { IProductCategory } from "@/features/product-categories/schemas/product-category.schema";
import { ISupplier } from "@/features/suppliers/schemas/supplier.schema";
import { ProductCategorySelect } from "@/features/product-categories/components/product-category-select";
import { SupplierSelect } from "@/features/suppliers/components/supplier-select";
import { InputField } from "@/components/shared/field/input-field";
import { TextareaField } from "@/components/shared/field/textarea-field";
import { useImageUploadField } from "@/hooks/use-image-field";
import { Modal } from "@/components/shared/modal/modal";
import { ButtonProps } from "@/interfaces/components/button";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { useEffect } from "react";

interface CreateProductButtonProps extends ButtonProps {
  categories: IProductCategory[];
  suppliers: ISupplier[];
}

export function CreateProductButton({
  categories,
  suppliers,
  ...props
}: CreateProductButtonProps) {
  const modal = useModal();

  const { formAction, isPending, error, clearError, state } = useForm({
    action: createProductAction,
    mode: "controlled",
  });

  const { handleImageChange, ImageUploadField, ...upload } =
    useImageUploadField();

  useEffect(() => {
    if (state && state.status === "success") {
      modal.setIsOpen(false);
      state.status = "expected-error";
    }
  }, [modal, state]);

  return (
    <>
      {/* Button */}
      <Button {...props} onClick={() => modal.setIsOpen(true)}>
        <Plus />
        <span>เพิ่มสินค้า</span>
      </Button>

      {/* Modal */}
      <Modal
        open={modal.isOpen}
        onOpenChange={modal.setIsOpen}
        title="แบบฟอร์มเพิ่มสินค้า"
        description=""
      >
        <Form
          action={formAction}
          onChange={clearError}
          className="space-y-3"
          confirmConfig={{
            title: "เพิ่มสินค้า",
            onBeforeConfirm({ formData }) {
              if (upload.images.length > 0) {
                formData.append("product-image", upload.images[0]);
              }

              return formData;
            },
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <SupplierSelect
              label="ผู้จัดจำหน่าย"
              name="supplier-id"
              className="w-full"
              suppliers={suppliers}
              errorMessage={error.supplierId}
              required
            />
            <ProductCategorySelect
              label="ประเภทสินค้า"
              name="product-category-id"
              className="w-full"
              categories={categories}
              errorMessage={error.categoryId}
              required
            />
            <div className="col-span-full">
              <InputField
                label="ชื่อ"
                name="product-name"
                placeholder="กรอกชื่อสินค้า"
                className="w-full"
                errorMessage={error.productName}
                required
              />
            </div>
            <div className="col-span-full">
              <InputField
                label="Barcode"
                name="product-barcode"
                placeholder="กรอกรหัสบาร์โค้ด เช่น 0123456789012"
                className="w-full"
                errorMessage={error.productBarcode}
                required
              />
            </div>
            <InputField
              label="จำนวนสินค้า"
              type="number"
              name="product-stock-level"
              placeholder="กรอกจำนวนสินค้า(Stock)"
              errorMessage={error.productStockLevel}
              required
            />
            <InputField
              label="ราคาต่อหน่วย"
              type="number"
              step="0.01"
              name="product-unit-price"
              placeholder="กรอกราคาต่อหน่วย"
              errorMessage={error.productUnitPrice}
              required
            />
            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-2">
              <TextareaField
                label="รายละเอียดสินค้า"
                className="w-full h-40"
                name="product-description"
                placeholder="กรอกรายละเอียดสินค้้า"
                errorMessage={error.productDescription}
              />

              <ImageUploadField
                label="อัพโหลดรูปภาพ"
                className="w-full h-40 overflow-hidden"
                onImageChange={handleImageChange}
                existingImages={[]}
              />
            </div>
          </div>

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
