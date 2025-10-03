"use client";

import { UserPlus } from "lucide-react";
import { ISupplier } from "../schemas/supplier.schema";
import { CreateSupplierButton } from "./action/create-supplier-button";
import { SupplierListTable } from "./supplier-list-table";
import { useState } from "react";
import { SupplierSearch } from "./supplier-search";

interface SupplierContainerProps {
  suppliers: ISupplier[];
}

export function SupplierContainer({ suppliers }: SupplierContainerProps) {
  const [filteredSuppliers, setFilteredSuppliers] = useState<ISupplier[]>(
    []
  );

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        {/* Form */}
        <CreateSupplierButton>
          <UserPlus />
          <span>เพิ่มผู้จัดจำหน่าย</span>
        </CreateSupplierButton>

        {/* Search */}
        <SupplierSearch
          suppliers={suppliers}
          setFilteredSuppliers={setFilteredSuppliers}
        />
      </div>

      {/* Table */}
      <SupplierListTable
        card={{
          container: true,
          header: true,
          content: true,
          footer: false,
        }}
        suppliers={filteredSuppliers}
      />
    </>
  );
}
