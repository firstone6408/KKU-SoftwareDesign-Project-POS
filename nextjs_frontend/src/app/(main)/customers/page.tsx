import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { CustomerContainer } from "@/features/customers/components/customer-container";
import { getCustomerList } from "@/features/customers/services/customer.service";
import { AuthClient } from "@/utils/auth.utils";

export default async function CustomerPage() {
  const { token } = await AuthClient.getInstance().getAuthenticatedUser();
  const customers = await getCustomerList(token);

  return (
    <div className="main-container">
      <Header
        title="ลูกค้า"
        description="สำหรับการเพิ่ม ลบ แก้ไข เกี่ยวกับลูกค้า"
      />
      <Separator />
      <CustomerContainer customers={customers} />
    </div>
  );
}
