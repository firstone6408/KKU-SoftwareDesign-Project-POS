import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ModalType } from "@/interfaces/components/modal";
import { ISupplier } from "../../services/suppliers.interface";

interface SupplierDetailModalProps extends ModalType {
    supplier: ISupplier | null;
}

export function SupplierDetailModal({
    onOpenChange,
    open,
    supplier,
}: SupplierDetailModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>รายละเอียดผู้จัดส่ง</DialogTitle>
                    <DialogDescription>
                        แก้ไขข้อมูลผู้จัดส่งที่นี่ กดบันทึกเมื่อเสร็จสิ้น
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    {supplier && (
                        <>
                            <div>
                                <span className="font-semibold">ชื่อผู้จัดส่ง: </span>
                                {supplier.name}
                            </div>
                            <div>
                                <span className="font-semibold">ข้อมูลติดต่อ: </span>
                                {supplier.contactInfo}
                            </div>
                            {/* เพิ่ม field อื่นๆ ตามต้องการ */}
                        </>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">ยกเลิก</Button>
                    </DialogClose>
                    <Button type="submit">บันทึกการเปลี่ยนแปลง</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
