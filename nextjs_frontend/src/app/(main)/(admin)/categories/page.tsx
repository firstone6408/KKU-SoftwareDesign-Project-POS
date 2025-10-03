import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { ProductCategoryContainer } from "@/features/product-categories/components/product-category-container";
import { getProductCategoryList } from "@/features/product-categories/services/product-category.service";
import { AuthClient } from "@/utils/auth.utils";

export default async function ProductCategoryPage() {
  const { token } = await AuthClient.getInstance().getAuthenticatedUser();
  const categories = await getProductCategoryList(token);

  return (
    <div className="main-container">
      <Header
        title="ประเภทสินค้า"
        description="สำหรับการเพิ่ม ลบ แก้ไข เกี่ยวกับประเภทสินค้า"
      />
      <Separator />
      <ProductCategoryContainer categories={categories} />
    </div>
  );
}
