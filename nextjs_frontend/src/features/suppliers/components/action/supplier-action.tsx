"use client";

import { Button } from "@/components/ui/button";
import { ISupplier } from "../../schemas/supplier.schema";
import { Pen, Trash } from "lucide-react";
import { DeleteSupplierButton } from "./delete-supplier-button";
import { UpdateSupplierModal } from "./update-supplier-modal";
import { useModal } from "@/hooks/use-modal";

interface SupplierActionProps {
  supplier: ISupplier;
}

export function SupplierAction({ supplier }: SupplierActionProps) {
  const updateSupplierModal = useModal<ISupplier>();

  return (
    <>
      <div className="flex gap-2 justify-center">
        <Button
          variant={"outline"}
          onClick={() => updateSupplierModal.openModal(supplier)}
        >
          <Pen />
        </Button>
        <DeleteSupplierButton
          icon={Trash}
          variant={"destructive"}
          supplier={supplier}
        />
      </div>

      {/* Modal */}
      <UpdateSupplierModal
        key={updateSupplierModal.selected?.id}
        onClose={updateSupplierModal.closeModal}
        onOpenChange={updateSupplierModal.setIsOpen}
        open={updateSupplierModal.isOpen}
        supplier={updateSupplierModal.selected}
      />
    </>
  );
}
