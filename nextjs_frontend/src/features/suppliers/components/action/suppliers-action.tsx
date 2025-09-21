"use client";

import { Button } from "@/components/ui/button";
import { ISupplier } from "../../services/suppliers.interface";
import { Eye, Pen, Trash } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { SupplierDetailModal } from "./supplier-detail-modal";

interface SupplierActionProps {
    supplier: ISupplier;
}

export function SupplierAction({ supplier }: SupplierActionProps) {
    const supplierDetailModal = useModal<ISupplier>();

    return (
        <>
            <div className="flex justify-center gap-2">
                <div>
                    <Button variant={"outline"} className="cursor-pointer">
                        <Pen />
                    </Button>
                </div>
                <div>
                    <Button variant={"destructive"} className="cursor-pointer">
                        <Trash />
                    </Button>
                </div>
                <div>
                    <Button
                        className="cursor-pointer"
                        onClick={() => supplierDetailModal.openModal(supplier)}
                    >
                        <Eye />
                    </Button>
                </div>
            </div>

            <SupplierDetailModal
                onOpenChange={supplierDetailModal.setIsOpen}
                open={supplierDetailModal.isOpen}
                onClose={supplierDetailModal.closeModal}
                supplier={supplierDetailModal.selected}
            />
        </>
    );
}
