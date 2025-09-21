"use client";

import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { IProductCategory } from "../../schemas/product-category.schema";
import { DeleteProductCategoryButton } from "./delete-product-category-button";
import { UpdateProductCategoryModal } from "./update-product-category-modal";

interface ProductCategoryActionProps {
  productCategory: IProductCategory;
}

export function ProductCategoryAction({
  productCategory,
}: ProductCategoryActionProps) {
  const updateProductCategoryModal = useModal<IProductCategory>();

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={() =>
            updateProductCategoryModal.openModal(productCategory)
          }
        >
          <Pen />
        </Button>

        <DeleteProductCategoryButton
          icon={Trash}
          productCategory={productCategory}
        />
      </div>

      {/* Modal */}
      <UpdateProductCategoryModal
        key={updateProductCategoryModal.selected?.id}
        onClose={updateProductCategoryModal.closeModal}
        onOpenChange={updateProductCategoryModal.setIsOpen}
        open={updateProductCategoryModal.isOpen}
        productCategory={updateProductCategoryModal.selected}
      />
    </>
  );
}
