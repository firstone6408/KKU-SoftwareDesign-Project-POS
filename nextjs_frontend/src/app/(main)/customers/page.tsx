import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { CustomerForm } from "@/features/customers/components/customer-form";
import { CustomerListTable } from "@/features/customers/components/customer-list-table";
import { getCustomerList } from "@/features/customers/services/customer.service";

export default async function CustomerPage() {
  const customers = await getCustomerList();

  return (
    <div className="main-container">
      <Header
        title="ลูกค้า"
        description="สำหรับการเพิ่ม ลบ แก้ไข เกี่ยวกับลูกค้า"
      />
      <Separator />
      <CustomerForm
        card={{
          container: true,
          header: true,
          content: true,
        }}
      />
      <CustomerListTable
        card={{
          container: true,
          header: true,
          content: true,
        }}
        customers={customers}
      />
    </div>
  );
}
