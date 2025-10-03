"use client";

import { UserPlus } from "lucide-react";
import { ICustomer } from "../schemas/customer.schema";
import { CreateCustomerButton } from "./action/create-customer-button";
import { CustomerListTable } from "./customer-list-table";
import { CustomerSearch } from "./customer-search";
import { useState } from "react";

interface CustomerContainerProps {
  customers: ICustomer[];
}

export function CustomerContainer({ customers }: CustomerContainerProps) {
  const [filteredCustomers, setFilteredCustomers] =
    useState<ICustomer[]>(customers);

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        {/* Form */}
        <CreateCustomerButton>
          <UserPlus />
          <span>เพิ่มลูกค้า</span>
        </CreateCustomerButton>

        {/* Search */}
        <CustomerSearch
          customers={customers}
          setFilteredCustomers={setFilteredCustomers}
        />
      </div>

      {/* Table */}
      <CustomerListTable
        card={{
          container: true,
          header: true,
          content: true,
        }}
        customers={filteredCustomers}
      />
    </>
  );
}
