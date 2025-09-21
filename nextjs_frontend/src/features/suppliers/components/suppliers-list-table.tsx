import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ISupplier } from "../services/suppliers.interface";
import { SupplierAction } from "../components/action/suppliers-action";

interface SupplierListTableProps {
    suppliers: ISupplier[];
}

export function SuppliersListTable({ suppliers }: SupplierListTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-end">ลำดับ</TableHead>
                    <TableHead>ชื่อผู้จัดส่ง</TableHead>
                    <TableHead>ข้อมูลติดต่อ</TableHead>
                    <TableHead className="text-center w-[20%]">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {suppliers.map((supplier, index) => (
                    <TableRow key={supplier.id}>
                        <TableCell className="text-end">{index + 1}</TableCell>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>{supplier.contactInfo}</TableCell>
                        <TableCell>
                            <SupplierAction supplier={supplier} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
