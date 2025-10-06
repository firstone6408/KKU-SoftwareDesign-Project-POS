"use client";

import { ModalProps } from "@/interfaces/components/modal";
import { IProduct } from "../../schemas/product.schema";
import { Modal } from "@/components/shared/modal/modal";
import { useEffect, useState } from "react";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { InputField } from "@/components/shared/field/input-field";
import { TextareaField } from "@/components/shared/field/textarea-field";
import { ProductCategorySelect } from "@/features/product-categories/components/product-category-select";
import { SupplierSelect } from "@/features/suppliers/components/supplier-select";
import { Pen, Plus, Trash, X } from "lucide-react";
import { IProductCategory } from "@/features/product-categories/schemas/product-category.schema";
import { ISupplier } from "@/features/suppliers/schemas/supplier.schema";
import { useForm } from "@/hooks/use-form";
import { updateProductAction } from "../../actions/product.action";
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "./delete-product-button";
import { useImageUploadField } from "@/hooks/use-image-field";
import { Form } from "@/utils/form.utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface UpdateProductModalProps extends ModalProps {
  product: IProduct | null;
  categories: IProductCategory[];
  suppliers: ISupplier[];
}

type Tab = "detail" | "image";

export function UpdateProductModal({
  product,
  categories,
  suppliers,
  onClose,
  onOpenChange,
  open,
}: UpdateProductModalProps) {
  const { formAction, isPending, error, clearError, state } = useForm({
    action: updateProductAction,
    mode: "controlled",
  });

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [tab, setTab] = useState<Tab>("detail");

  const { handleImageChange, ImageUploadField, ...upload } =
    useImageUploadField();

  // set isUpdate = false when open modal
  useEffect(() => {
    setIsUpdate(false);
  }, [open]);

  // close modal if success
  useEffect(() => {
    if (state && state.status === "success") {
      if (onClose) {
        onClose();
      }
    }
  }, [state, onClose]);

  if (!product) {
    return;
  }

  const toggleUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  const fieldChangeIfUpdate = () => {
    return {
      hiddenIcon: !isUpdate,
      readOnly: !isUpdate,
    };
  };

  const handleSubmit = () => {
    setTab("detail");
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="รายละเอียดสินค้า"
      description="สามารถแก้ไข / ลบ สินค้าได้"
    >
      <div className="space-y-3">
        <Form
          id="update-product-form"
          action={formAction}
          onChange={clearError}
          confirmConfig={{
            title: "แก้ไขสินค้า",
            onBeforeConfirm({ formData }) {
              formData.append(
                "product-image",
                upload.images.length > 0 ? upload.images[0] : ""
              );

              return formData;
            },
          }}
        >
          <input
            type="hidden"
            name="product-id"
            defaultValue={product.id}
          />
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as Tab)}
          >
            <TabsList className="w-full">
              <TabsTrigger value={"detail"}>รายละเอียดสินค้า</TabsTrigger>
              <TabsTrigger value={"image"}>รูปภาพสินค้า</TabsTrigger>
            </TabsList>

            {/* Detail */}
            <TabsContent value={"detail"}>
              {isUpdate ? (
                <>
                  <SupplierSelect
                    label="ผู้จัดจำหน่าย"
                    name="supplier-id"
                    className="w-full"
                    suppliers={suppliers}
                    defaultValue={product.supplier.id}
                    errorMessage={error.supplierId}
                    required
                  />
                  <ProductCategorySelect
                    label="ประเภทสินค้า"
                    name="product-category-id"
                    className="w-full"
                    categories={categories}
                    defaultValue={product.category.id}
                    errorMessage={error.categoryId}
                    required
                  />
                </>
              ) : (
                <>
                  <InputField
                    label="ผู้จัดจำหน่าย"
                    defaultValue={product.supplier.name}
                    className="w-full"
                    readOnly
                    hiddenIcon
                  />
                  <InputField
                    label="ประเภทสินค้า"
                    defaultValue={product.category.name}
                    className="w-full"
                    readOnly
                    hiddenIcon
                  />
                </>
              )}

              <div className="col-span-full">
                <InputField
                  label="รหัสสินค้า"
                  className="w-full"
                  defaultValue={product.productCode}
                  readOnly
                  hiddenIcon
                />
                <InputField
                  label="Barcode"
                  name="product-barcode"
                  placeholder="กรอกชื่อบาร์โค้ดสินค้า"
                  className="w-full"
                  defaultValue={product.barcode}
                  errorMessage={error.productBarcode}
                  required
                  {...fieldChangeIfUpdate()}
                />
              </div>
              <div className="col-span-full">
                <InputField
                  label="ชื่อ"
                  name="product-name"
                  placeholder="กรอกชื่อสินค้า"
                  className="w-full"
                  defaultValue={product.name}
                  errorMessage={error.productName}
                  required
                  {...fieldChangeIfUpdate()}
                />
              </div>

              <div className="col-span-full">
                <TextareaField
                  label="รายละเอียดสินค้า"
                  name="product-description"
                  placeholder="กรอกรายละเอียดสินค้้า"
                  defaultValue={product.description || ""}
                  errorMessage={error.productDescription}
                  {...fieldChangeIfUpdate()}
                />
              </div>
            </TabsContent>

            {/* Image */}
            <TabsContent value={"image"}>
              <div className="col-span-full">
                <ImageUploadField
                  label="รูปภาพสินค้า"
                  className="min-h-60"
                  onImageChange={handleImageChange}
                  existingImages={
                    product.imageUrl
                      ? [
                          {
                            id: product.imageUrl,
                            url: product.imageUrl,
                            isMain: true,
                          },
                        ]
                      : []
                  }
                  disabled={!isUpdate}
                />
              </div>
            </TabsContent>
          </Tabs>
        </Form>
        {isUpdate ? (
          <div className="grid grid-cols-3 gap-2">
            <DeleteProductButton
              onClose={onClose}
              className="w-full"
              product={product}
              icon={Trash}
              variant={"destructive"}
            >
              ลบ
            </DeleteProductButton>
            <SubmitButton
              form="update-product-form"
              icon={Plus}
              isPending={isPending}
              onClick={() => handleSubmit()}
            >
              บันทึก
            </SubmitButton>
            <Button onClick={() => toggleUpdate()} variant={"outline"}>
              <X />
              <span>ยกเลิก</span>
            </Button>
          </div>
        ) : (
          <div className="text-end">
            <Button onClick={() => toggleUpdate()} variant={"outline"}>
              <Pen />
              <span>แก้ไข</span>
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
