import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProductCategory } from "../services/productcategory.interface";
import { ProductCategoryAction } from "./action/productcategory-action";
//import { CustomerAction } from "./action/customer-action";

interface ProductCategoryListTableProps {
  productcategorys: IProductCategory[];
}

export function ProductCategoryListTable({ productcategorys }: ProductCategoryListTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">ลำดับ</TableHead>
          <TableHead>ชื่อ</TableHead>
          <TableHead className="text-center w-[20%]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productcategorys.map((productcategory, index) => (
          <TableRow key={productcategory.id}>
            <TableCell className="text-end">{index + 1}</TableCell>
            <TableCell>{productcategory.name}</TableCell>
            <TableCell>
              <ProductCategoryAction productcategory={productcategory} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
