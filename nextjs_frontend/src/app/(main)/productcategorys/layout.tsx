import { ProductCategoryForm } from "@/features/productcategorys/components/productcategory-form";
import { ProductCategoryListTable } from "@/features/productcategorys/components/productcategory-list-table";
import { getProductCategoryList } from "@/features/productcategorys/services/productcategory.service";
// import { IProductCategory } from "@/features/productcategorys/services/productcategory.interface";
// import { IProductCategory } from "@/features/productcategorys/services/productcategory.interface";
export default async function ProductCategoryPage() {
  const productcategorys = await getProductCategoryList();

  return (
    <div className="main-container space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">จัดการประเภทสินค้า</h1>
        <ProductCategoryForm />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">รายการประเภทสินค้า</h2>
        <ProductCategoryListTable productcategorys={productcategorys} />
      </div>
    </div>
  );
}