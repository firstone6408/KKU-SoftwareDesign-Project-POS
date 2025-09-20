
import { ProductCategoryForm } from "@/features/productcategorys/components/productcategory-form";
import { ProductCategoryListTable } from "@/features/productcategorys/components/productcategory-list-table";
import { getProductCategoryList } from "@/features/productcategorys/services/productcategory.service";

export default async function ProductCategoryPage() {
  const categories = await getProductCategoryList();

  return (
    <div className="main-container">
      <ProductCategoryForm />
      <ProductCategoryListTable productcategorys={categories} />
    </div>
  );
}