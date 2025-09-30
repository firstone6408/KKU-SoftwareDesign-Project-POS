import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { getProductCategoryList } from "@/features/product-categories/services/product-category.service";
import { CreateProductButton } from "@/features/products/components/create-product-button";
import { ProductListTable } from "@/features/products/components/product-list-table";
import { getProductList } from "@/features/products/services/product.service";
import { getSupplierList } from "@/features/suppliers/services/supplier.service";
import { AuthClient } from "@/utils/auth.utils";

export default async function ProductPage() {
  const { token } = await AuthClient.getInstance().getAuthenticatedUser();

  const products = await getProductList(token);
  const categories = await getProductCategoryList(token);
  const suppliers = await getSupplierList(token);

  return (
    <div className="main-container">
      {/* Header */}
      <Header
        title="สินค้า"
        description="สำหรับการเพิ่ม ลบ แก้ไข เกี่ยวกับผู้จัดจำหน่าย"
      />
      <Separator />

      {/* Form */}
      <div className="text-end">
        <CreateProductButton
          categories={categories}
          suppliers={suppliers}
        />
      </div>

      {/* Table */}
      <ProductListTable
        card={{
          container: true,
          content: true,
          header: true,
        }}
        products={products}
        categories={categories}
        suppliers={suppliers}
      />
    </div>
  );
}
