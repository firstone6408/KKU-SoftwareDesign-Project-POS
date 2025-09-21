import { BaseCardProps } from "@/interfaces/components/card";
import { ISupplier } from "../schemas/supplier.schema";
import { BaseCard } from "@/components/shared/card/base-card";
import { List } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SupplierAction } from "./action/supplier-action";

interface SupplierListTableProps extends BaseCardProps {
  suppliers: ISupplier[];
}

export function SupplierListTable({
  suppliers,
  ...props
}: SupplierListTableProps) {
  return (
    <BaseCard
      {...props}
      headerTitleIcon={List}
      headerTitle="รายการผู้จัดจำหน่ายทั้งหมด"
      content={
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-end w-[10%]">ลำดับ</TableHead>
              <TableHead>ชื่อ</TableHead>
              <TableHead>ติดต่อ</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier, index) => (
              <TableRow key={supplier.id}>
                <TableCell className="text-end">{index + 1}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contactInfo}</TableCell>
                <TableCell className="text-center">
                  <SupplierAction supplier={supplier} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    />
  );
}
