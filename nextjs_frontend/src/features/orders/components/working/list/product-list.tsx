"use client";

import { IOrder } from "@/features/orders/schemas/order.schema";
import { IProduct } from "@/features/products/schemas/product.schema";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ProductListCard } from "./product-list-card";
import { useState } from "react";
import { ProductSearch } from "@/features/products/components/search/product-search";
import { ISupplier } from "@/features/suppliers/schemas/supplier.schema";
import { IProductCategory } from "@/features/product-categories/schemas/product-category.schema";

interface ProductListProps {
  order: IOrder;
  products: IProduct[];
  suppliers: ISupplier[];
  categories: IProductCategory[];
}

export function ProductList({
  order,
  products,
  suppliers,
  categories,
}: ProductListProps) {
  const [filteredProducts, setFilteredProducts] =
    useState<IProduct[]>(products);

  return (
    <div className="col-span-2 space-y-2">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start w-full  gap-2">
        <h2 className="text-xl font-semibold p-1">รายการสินค้า</h2>
        <ProductSearch
          products={products}
          suppliers={suppliers}
          categories={categories}
          setFilteredProducts={setFilteredProducts}
        />
      </div>
      {filteredProducts.length > 0 ? (
        <ScrollArea className="h-[calc(112vh)] overflow-auto">
          <ProductListCard order={order} products={filteredProducts} />
        </ScrollArea>
      ) : (
        <div className="flex justify-center items-center h-96 text-current/50">
          ไม่พบรายการสินค้า
        </div>
      )}
    </div>
  );
}
