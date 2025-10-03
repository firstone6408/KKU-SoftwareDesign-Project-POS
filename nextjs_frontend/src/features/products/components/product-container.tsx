"use client";

import { IProductCategory } from "@/features/product-categories/schemas/product-category.schema";
import { ISupplier } from "@/features/suppliers/schemas/supplier.schema";
import { IProduct } from "../schemas/product.schema";
import { CreateProductButton } from "./action/create-product-button";
import { ProductListTable } from "./product-list-table";
import { useState } from "react";
import { ProductSearch } from "./search/product-search";

interface ProductContainerProps {
  products: IProduct[];
  categories: IProductCategory[];
  suppliers: ISupplier[];
}

export function ProductContainer({
  products,
  categories,
  suppliers,
}: ProductContainerProps) {
  const [filteredProducts, setFilteredProducts] =
    useState<IProduct[]>(products);

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
        {/* Form */}
        <CreateProductButton
          categories={categories}
          suppliers={suppliers}
        />

        {/* Search */}
        <ProductSearch
          products={products}
          setFilteredProducts={setFilteredProducts}
          categories={categories}
          suppliers={suppliers}
        />
      </div>

      {/* Table */}
      <ProductListTable
        card={{
          container: true,
          content: true,
          header: true,
        }}
        products={filteredProducts}
        categories={categories}
        suppliers={suppliers}
      />
    </>
  );
}
