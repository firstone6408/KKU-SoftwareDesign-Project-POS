"use client";

import { IProductCategory } from "../schemas/product-category.schema";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { InputSearch } from "@/components/shared/search/input-search";

interface ProductCategorySearchProps {
  cagegories: IProductCategory[];
  setFilteredCategories: React.Dispatch<
    React.SetStateAction<IProductCategory[]>
  >;
}

export function ProductCategorySearch({
  cagegories,
  setFilteredCategories,
}: ProductCategorySearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    const filteredCategories = cagegories.filter((category) => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      return category.name.toLowerCase().includes(searchLower);
    });
    setFilteredCategories(filteredCategories);
  }, [debouncedSearchTerm, cagegories, setFilteredCategories]);

  return (
    <InputSearch
      className="md:w-[40%]"
      placeholder="ค้นหาประเภทสินค้า..."
      setSearchTerm={setSearchTerm}
    />
  );
}
