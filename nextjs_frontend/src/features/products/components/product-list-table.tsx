import { BaseCardProps } from "@/interfaces/components/card";
import { IProduct } from "../schemas/product.schema";
import { BaseCard } from "@/components/shared/card/base-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { List } from "lucide-react";
import { ProductAction } from "./action/product-action";
import { IProductCategory } from "@/features/product-categories/schemas/product-category.schema";
import { ISupplier } from "@/features/suppliers/schemas/supplier.schema";
import Image from "next/image";
import { FILE_CONFIG } from "@/configs/file.config";
import { UrlUtil } from "@/utils/url.utils";
import { FormatNumber } from "@/utils/format-number.utils";
import { EmptyTableRow } from "@/components/shared/table/empty-table-row";

interface ProductListTableProps extends BaseCardProps {
  products: IProduct[];
  categories: IProductCategory[];
  suppliers: ISupplier[];
}

export function ProductListTable({
  products,
  categories,
  suppliers,
  ...props
}: ProductListTableProps) {
  return (
    <BaseCard
      headerTitleIcon={List}
      headerTitle={"รายการสินค้าทั้งหมด"}
      {...props}
      content={
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>รหัสสินค้า</TableHead>
                <TableHead className="text-center">รูป</TableHead>
                <TableHead>ผู้จัดจำหน่าย</TableHead>
                <TableHead>ประเภท</TableHead>
                <TableHead>ชื่อ</TableHead>
                <TableHead className="text-end">ราคาต่อหน่วย</TableHead>
                <TableHead className="text-end">จำนวน</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.productCode}</TableCell>
                    <TableCell className="w-32 flex justify-center">
                      <div className="relative size-10">
                        <Image
                          src={
                            product.imageUrl
                              ? UrlUtil.getImageUrl(product.imageUrl)
                              : FILE_CONFIG.IMAGES.NO_PRODUCT_IMAGE
                          }
                          className="rounded-md border-2 border-primary"
                          fill
                          alt={`product-image-${product.id}`}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {product.supplier.name}
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {product.category.name}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-end">
                      {FormatNumber.number(product.unitPrice)}
                    </TableCell>
                    <TableCell className="text-end">
                      {FormatNumber.number(product.stockLevel)}
                    </TableCell>
                    <TableCell>
                      <ProductAction
                        product={product}
                        categories={categories}
                        suppliers={suppliers}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <EmptyTableRow />
              )}
            </TableBody>
          </Table>
        </>
      }
    />
  );
}
