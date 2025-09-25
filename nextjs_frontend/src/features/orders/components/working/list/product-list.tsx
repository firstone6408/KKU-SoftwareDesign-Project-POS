"use client";

import { IOrder } from "@/features/orders/schemas/order.schema";
import { IProduct } from "@/features/products/schemas/product.schema";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ProductListCard } from "./product-list-card";
import { ProductSearch } from "./product-search";
import { useState } from "react";

interface ProductListProps {
  order: IOrder;
  products: IProduct[];
}

export function ProductList({ order, products }: ProductListProps) {
  const [filteredProducts, setFilteredProducts] =
    useState<IProduct[]>(products);

  return (
    <div className="col-span-2 space-y-2">
      <div className="flex justify-between items-center gap-2">
        <h2 className="text-xl font-semibold p-1">รายการสินค้า</h2>
        <ProductSearch
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
      </div>
      <ScrollArea className="h-[calc(112vh)] overflow-auto">
        <ProductListCard order={order} products={filteredProducts} />
      </ScrollArea>
    </div>
  );
}
