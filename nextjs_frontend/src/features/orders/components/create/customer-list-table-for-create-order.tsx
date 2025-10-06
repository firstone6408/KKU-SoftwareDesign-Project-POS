import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICustomer } from "@/features/customers/schemas/customer.schema";
import { CreateOrderForm } from "./create-order-form";
import { EmptyTableRow } from "@/components/shared/table/empty-table-row";

interface CustomerListTableForCreateOrderProps {
  customers: ICustomer[];
}

export function CustomerListTableForCreateOrder({
  customers,
}: CustomerListTableForCreateOrderProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-end">ลำดับ</TableHead>
          <TableHead>ชื่อลูกค้า</TableHead>
          <TableHead>ติดต่อ</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.length > 0 ? (
          customers.map((customer, index) => (
            <TableRow key={customer.id}>
              <TableCell className="text-end">{index + 1}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.contactInfo}</TableCell>
              <TableCell>
                <CreateOrderForm customer={customer} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <EmptyTableRow />
        )}
      </TableBody>
    </Table>
  );
}
