import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerAction } from "./action/customer-action";
import { ICustomer } from "../schemas/customer.schema";
import { BaseCardProps } from "@/interfaces/components/card";
import { BaseCard } from "@/components/shared/card/base-card";
import { List } from "lucide-react";
import { EmptyTableRow } from "@/components/shared/table/empty-table-row";

interface CustomerListTableProps extends BaseCardProps {
  customers: ICustomer[];
}

export function CustomerListTable({
  customers,
  ...props
}: CustomerListTableProps) {
  return (
    <BaseCard
      headerTitleIcon={List}
      headerTitle="รายการลูกค้าทั้งหมด"
      {...props}
      content={
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รหัสลูกค้า</TableHead>
              <TableHead>ชื่อ</TableHead>
              <TableHead>ติดต่อ</TableHead>
              <TableHead className="text-center w-[20%]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.customerCode}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.contactInfo}</TableCell>
                  <TableCell>
                    <CustomerAction customer={customer} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <EmptyTableRow />
            )}
          </TableBody>
        </Table>
      }
    />
  );
}
