"use client";

import { IProductCategory } from "@/features/product-categories/schemas/product-category.schema";
import { ISupplier } from "@/features/suppliers/schemas/supplier.schema";
import { IProduct } from "../../schemas/product.schema";
import { useEffect, useState } from "react";
import { InputSearch } from "@/components/shared/search/input-search";
import { SupplierSelect } from "@/features/suppliers/components/supplier-select";
import { ProductCategorySelect } from "@/features/product-categories/components/product-category-select";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

interface ProductSearchProps {
  products: IProduct[];
  categories: IProductCategory[];
  suppliers: ISupplier[];

  setFilteredProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;

  className?: string;
}

export function ProductSearch({
  products,
  categories,
  suppliers,
  setFilteredProducts,
  className,
}: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<string>("all");
  const [selectedSupplierId, setSelectedSupplierId] =
    useState<string>("all");

  const debouncedSearchTerm = useDebounce(searchTerm);
  const debouncedSelectedCategoryId = useDebounce(selectedCategoryId);
  const debouncedSelectedSupplierId = useDebounce(selectedSupplierId);

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const searchLower = debouncedSearchTerm.toLowerCase();

      // ตรวจ search
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.productCode.toLowerCase().includes(searchLower) ||
        (product.description?.toLowerCase().includes(searchLower) ??
          false) ||
        product.supplier.name.toLowerCase().includes(searchLower);

      const matchesCategory =
        debouncedSelectedCategoryId === "all"
          ? true
          : product.category.id === debouncedSelectedCategoryId;

      const matchesSupplier =
        debouncedSelectedSupplierId === "all"
          ? true
          : product.supplier.id === debouncedSelectedSupplierId;

      return matchesSearch && matchesCategory && matchesSupplier;
    });

    setFilteredProducts(filteredProducts);
  }, [
    products,
    debouncedSearchTerm,
    debouncedSelectedCategoryId,
    debouncedSelectedSupplierId,
    setFilteredProducts,
  ]);

  return (
    <div
      className={cn("flex flex-col-reverse md:flex-row  gap-2", className)}
    >
      <div className="flex justify-end gap-2">
        <ProductCategorySelect
          className="w-full"
          categories={[
            { id: "all", name: "ประเภททั้งหมด" },
            ...categories,
          ]}
          defaultValue="all"
          onValueChange={setSelectedCategoryId}
        />
        <SupplierSelect
          className="w-full"
          suppliers={[
            {
              id: "all",
              name: "ผู้จัดจำหน่ายทั้งหมด",
              contactInfo: null,
            },
            ...suppliers,
          ]}
          defaultValue="all"
          onValueChange={setSelectedSupplierId}
        />
      </div>
      <InputSearch
        setSearchTerm={setSearchTerm}
        placeholder="ค้นหาสินค้า..."
      />
    </div>
  );
}
