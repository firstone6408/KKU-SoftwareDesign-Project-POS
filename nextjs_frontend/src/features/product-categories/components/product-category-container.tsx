"use client";

import { Plus } from "lucide-react";
import { IProductCategory } from "../schemas/product-category.schema";
import { CreateProductCategoryButton } from "./action/create-product-category-button";
import { ProductCategoryListTable } from "./product-category-list-table";
import { useState } from "react";
import { ProductCategorySearch } from "./product-category-search";

interface ProductCategoryContainerProps {
  categories: IProductCategory[];
}

export function ProductCategoryContainer({
  categories,
}: ProductCategoryContainerProps) {
  const [filteredCategories, setFilteredCategories] =
    useState<IProductCategory[]>(categories);

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        {/* Form */}
        <CreateProductCategoryButton>
          <Plus />
          <span>สร้างประเภทสินค้า</span>
        </CreateProductCategoryButton>

        {/* Search */}
        <ProductCategorySearch
          cagegories={categories}
          setFilteredCategories={setFilteredCategories}
        />
      </div>
      {/* Table */}
      <ProductCategoryListTable
        card={{
          container: true,
          header: true,
          content: true,
        }}
        productCategories={filteredCategories}
      />
    </>
  );
}
