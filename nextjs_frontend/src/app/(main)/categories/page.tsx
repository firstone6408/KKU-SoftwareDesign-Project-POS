import { MainHeader } from "@/components/layouts/main/header/header";
import MainSidebar from "@/components/layouts/main/sidebar/sidebar";
import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { ProductCategoryForm } from "@/features/productcategorys/components/productcategory-form";
import { ProductCategoryListTable } from "@/features/productcategorys/components/productcategory-list-table";
import { getProductCategoryList } from "@/features/productcategorys/services/productcategory.service";

export default async function ProductCategoryPage() {
  const categories = await getProductCategoryList();

  return (
    <div className="main-container">
      <SidebarProvider>
          <div className="min-h-svh flex">
            <MainSidebar />
            <div className="flex-1 flex flex-col overflow-hidden ">
              <MainHeader />
              <div className="main-container space-y-6">
                <div>
                  <h1 className="text-2xl font-bold mb-4">Product Category</h1>
                  <ProductCategoryForm />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">รายการประเภทสินค้า</h2>
                  <ProductCategoryListTable productcategorys={categories} />
                </div>
              </div>
            </div>
          </div>
        </SidebarProvider>
    </div>
  );
}