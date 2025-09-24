"use client";

import { Button } from "@/components/ui/button";
import { IProduct } from "../../schemas/product.schema";
import { DollarSign, Eye, Layers } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { UpdateProductModal } from "./update-product-modal";
import { IProductCategory } from "@/features/product-categories/schemas/product-category.schema";
import { ISupplier } from "@/features/suppliers/schemas/supplier.schema";
import { UpdateStockProductModal } from "./update-stock-product-modal";
import { UpdateUnitPriceProductModal } from "./update-unit-price-product-modal";

interface ProductActionProps {
  product: IProduct;
  categories: IProductCategory[];
  suppliers: ISupplier[];
}

export function ProductAction({
  product,
  categories,
  suppliers,
}: ProductActionProps) {
  const updateProductModal = useModal<IProduct>();
  const updateStockProductModal = useModal<IProduct>();
  const updateUnitPriceProductModal = useModal<IProduct>();

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button
          variant={"outline"}
          onClick={() => updateUnitPriceProductModal.openModal(product)}
        >
          <DollarSign />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => updateStockProductModal.openModal(product)}
        >
          <Layers />
        </Button>
        <Button onClick={() => updateProductModal.openModal(product)}>
          <Eye />
        </Button>
      </div>

      {/* Modal */}
      <UpdateProductModal
        key={updateProductModal.selected?.id}
        onClose={updateProductModal.closeModal}
        onOpenChange={updateProductModal.setIsOpen}
        open={updateProductModal.isOpen}
        product={updateProductModal.selected}
        categories={categories}
        suppliers={suppliers}
      />
      <UpdateStockProductModal
        key={updateStockProductModal.selected?.id + "update-stock"}
        onClose={updateStockProductModal.closeModal}
        onOpenChange={updateStockProductModal.setIsOpen}
        open={updateStockProductModal.isOpen}
        product={updateStockProductModal.selected}
      />
      <UpdateUnitPriceProductModal
        key={
          updateUnitPriceProductModal.selected?.id + "update-unit-price"
        }
        onClose={updateUnitPriceProductModal.closeModal}
        onOpenChange={updateUnitPriceProductModal.setIsOpen}
        open={updateUnitPriceProductModal.isOpen}
        product={updateUnitPriceProductModal.selected}
      />
    </>
  );
}
