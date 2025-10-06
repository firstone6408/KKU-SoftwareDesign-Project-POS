import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductCategoryAction } from "./action/produ-ctcategory-action";
import { IProductCategory } from "../schemas/product-category.schema";
import { BaseCardProps } from "@/interfaces/components/card";
import { BaseCard } from "@/components/shared/card/base-card";
import { List } from "lucide-react";
import { EmptyTableRow } from "@/components/shared/table/empty-table-row";

interface ProductCategoryListTableProps extends BaseCardProps {
  productCategories: IProductCategory[];
}

export function ProductCategoryListTable({
  productCategories,
  ...props
}: ProductCategoryListTableProps) {
  return (
    <BaseCard
      headerTitleIcon={List}
      headerTitle="รายการประเภทสินค้าทั้งหมด"
      {...props}
      content={
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-end w-[20%]">ลำดับ</TableHead>
              <TableHead>ชื่อ</TableHead>
              <TableHead className="text-center w-[20%]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productCategories.length > 0 ? (
              productCategories.map((productCategory, index) => (
                <TableRow key={productCategory.id}>
                  <TableCell className="text-end">{index + 1}</TableCell>
                  <TableCell>{productCategory.name}</TableCell>
                  <TableCell>
                    <ProductCategoryAction
                      productCategory={productCategory}
                    />
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
