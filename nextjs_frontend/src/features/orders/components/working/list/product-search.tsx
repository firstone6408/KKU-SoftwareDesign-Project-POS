"use client";

import { InputField } from "@/components/shared/field/input-field";
import { IProduct } from "@/features/products/schemas/product.schema";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductSearchProps {
  products: IProduct[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export function ProductSearch({
  products,
  setFilteredProducts,
}: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          (product.description?.toLowerCase().includes(searchLower) ??
            false) ||
          product.supplier.name.toLowerCase().includes(searchLower)
        );
      })
    );
  }, [products, searchTerm, setFilteredProducts]);

  return (
    <div className="relative w-[40%]">
      <Search
        size={16}
        className="absolute left-2.5 top-6.5 -translate-y-1/2 text-gray-400"
      />
      <InputField
        placeholder="ค้นหาสินค้า..."
        onChange={(event) => setSearchTerm(event.target.value)}
        className="pl-8" // เพิ่ม padding ซ้าย ให้พ้น icon
      />
    </div>
  );
}
