import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FILE_CONFIG } from "@/configs/file.config";
import { IProduct } from "@/features/products/schemas/product.schema";
import { FormatNumber } from "@/utils/format-number.utils";
import { UrlUtil } from "@/utils/url.utils";
import { Plus } from "lucide-react";
import Image from "next/image";
import { CreateItemInOrderButton } from "./create-item-in-order-button";
import { IOrder } from "../../../schemas/order.schema";
import { Badge } from "@/components/ui/badge";

interface ProductListCardProps {
  order: IOrder;
  products: IProduct[];
}

export function ProductListCard({
  order,
  products,
}: ProductListCardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="relative flex justify-between shadow"
        >
          <CardContent className=" flex justify-center items-center">
            <div className="relative size-32">
              <Image
                src={
                  product.imageUrl
                    ? UrlUtil.getImageUrl(product.imageUrl)
                    : FILE_CONFIG.IMAGES.NO_PRODUCT_IMAGE
                }
                className="absolute rounded-md border-2 border-primary"
                fill
                alt={`product-image-${product.id}`}
              />
            </div>
          </CardContent>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>
              <div>Barcode: {product.barcode}</div>
              <div>รหัสสินค้า: {product.productCode}</div>
            </CardDescription>
          </CardHeader>
          <CardFooter className="font-semibold flex justify-between items-center gap-2">
            <p>ราคา: {FormatNumber.number(product.unitPrice)}</p>
            <CreateItemInOrderButton order={order} product={product}>
              <Plus />
            </CreateItemInOrderButton>
          </CardFooter>

          {/* Stock Level */}
          <Badge
            variant={"secondary"}
            className="absolute end-3 top-3 text-md"
          >
            {product.stockLevel}
          </Badge>
        </Card>
      ))}
    </div>
  );
}
