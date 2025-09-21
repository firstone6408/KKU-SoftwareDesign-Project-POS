import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { ProductCategoryForm } from "@/features/product-categories/components/product-category-form";
import { ProductCategoryListTable } from "@/features/product-categories/components/product-category-list-table";
import { getProductCategoryList } from "@/features/product-categories/services/product-category.service";

export default async function ProductCategoryPage() {
  const categories = await getProductCategoryList();

  return (
    <div className="main-container">
      <Header
        title="ประเภทสินค้า"
        description="สำหรับการเพิ่ม ลบ แก้ไข เกี่ยวกับประเภทสินค้า"
      />
      <Separator />
      <ProductCategoryForm
        card={{
          container: true,
          header: true,
          content: true,
        }}
      />
      <ProductCategoryListTable
        card={{
          container: true,
          header: true,
          content: true,
        }}
        productCategories={categories}
      />
    </div>
  );
}
