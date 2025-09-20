import { MainHeader } from "@/components/layouts/main/header/header";
import MainSidebar from "@/components/layouts/main/sidebar/sidebar";
import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { CustomerForm } from "@/features/customers/components/customer-form";
import { CustomerListTable } from "@/features/customers/components/customer-list-table";
import { getCustomerList } from "@/features/customers/services/customer.service";

export default async function CustomerPage() {
  const customers = await getCustomerList();

  return (
    <div className="main-container">
      <SidebarProvider>
          <div className="min-h-svh flex">
            <MainSidebar />
            <div className="flex-1 flex flex-col overflow-hidden ">
              <MainHeader />
              <div className="main-container space-y-6">
                <div>
                  <h1 className="text-2xl font-bold mb-4">Customer</h1>
                  <CustomerForm />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">รายการชื่อลูกค้า</h2>
                  <CustomerListTable customers={customers} />
                </div>
              </div>
            </div>
          </div>
        </SidebarProvider>
    </div>
  );
}
