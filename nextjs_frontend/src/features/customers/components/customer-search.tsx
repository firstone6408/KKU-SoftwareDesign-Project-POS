"use client";

import { InputSearch } from "@/components/shared/search/input-search";
import { ICustomer } from "../schemas/customer.schema";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface CustomerSearchProps {
  customers: ICustomer[];
  setFilteredCustomers: React.Dispatch<React.SetStateAction<ICustomer[]>>;
}

export function CustomerSearch({
  customers,
  setFilteredCustomers,
}: CustomerSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    const filteredCustomers = customers.filter((customer) => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.customerCode.toLowerCase().includes(searchLower) ||
        customer.contactInfo?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredCustomers(filteredCustomers);
  }, [customers, debouncedSearchTerm, setFilteredCustomers]);

  return (
    <InputSearch
      className="md:w-[40%]"
      setSearchTerm={setSearchTerm}
      placeholder="ค้นหาลูกค้า..."
    />
  );
}
