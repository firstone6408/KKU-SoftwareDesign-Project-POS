"use client";

import { useEffect, useState } from "react";
import { ISupplier } from "../schemas/supplier.schema";
import { useDebounce } from "@/hooks/use-debounce";
import { InputSearch } from "@/components/shared/search/input-search";

interface SupplierSearchProps {
  suppliers: ISupplier[];
  setFilteredSuppliers: React.Dispatch<ISupplier[]>;
}

export function SupplierSearch({
  suppliers,
  setFilteredSuppliers,
}: SupplierSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    const filteredSuppliers = suppliers.filter((supplier) => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      return (
        supplier.name.toLowerCase().includes(searchLower) ||
        supplier.contactInfo?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredSuppliers(filteredSuppliers);
  }, [debouncedSearchTerm, suppliers, setFilteredSuppliers]);

  return (
    <InputSearch
      className="md:w-[40%]"
      setSearchTerm={setSearchTerm}
      placeholder="ค้นหาผู้จัดจำหน่าย..."
    />
  );
}
