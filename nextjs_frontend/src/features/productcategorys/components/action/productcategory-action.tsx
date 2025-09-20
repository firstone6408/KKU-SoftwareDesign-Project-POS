"use client";

import { Button } from "@/components/ui/button";
import { IProductCategory } from "../../services/productcategory.interface";
import { Eye, Pen, Trash } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { ProductCategoryDetailModal } from "./productcategory-detail-modal";

interface ProductCategoryActionProps {
  productcategory: IProductCategory;
}

export function ProductCategoryAction({ productcategory }: ProductCategoryActionProps) {
  const productcategoryDetailModal = useModal<IProductCategory>();

  return (
    <>
      <div className="flex justify-center gap-2">
        <div>
          <Button variant={"outline"} className="cursor-pointer">
            <Pen />
          </Button>
        </div>
        <div>
          <Button variant={"destructive"} className="cursor-pointer">
            <Trash />
          </Button>
        </div>
        <div>
          <Button
            className="cursor-pointer"
            onClick={() => productcategoryDetailModal.openModal(productcategory)}
          >
            <Eye />
          </Button>
        </div>
      </div>

      <ProductCategoryDetailModal
        onOpenChange={productcategoryDetailModal.setIsOpen}
        open={productcategoryDetailModal.isOpen}
        onClose={productcategoryDetailModal.closeModal}
        productcategory={productcategoryDetailModal.selected}
      />
    </>
  );
}
