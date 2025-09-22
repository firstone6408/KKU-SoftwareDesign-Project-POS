import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { SupplierForm } from "@/features/suppliers/components/supplier-form";
import { SupplierListTable } from "@/features/suppliers/components/supplier-list-table";
import { getSupplierList } from "@/features/suppliers/services/supplier.service";
import { AuthClient } from "@/utils/auth.utils";

export default async function SupplierPage() {
  const { token } = await AuthClient.getInstance().getAuthenticatedUser();
  const suppliers = await getSupplierList(token);

  return (
    <div className="main-container">
      {/* Header */}
      <Header
        title="ผู้จัดจำหน่าย"
        description="สำหรับการเพิ่ม ลบ แก้ไข เกี่ยวกับผู้จัดจำหน่าย"
      />
      <Separator />

      {/* Form */}
      <SupplierForm
        card={{
          container: true,
          header: true,
          content: true,
          footer: false,
        }}
      />

      {/* Table */}
      <SupplierListTable
        card={{
          container: true,
          header: true,
          content: true,
          footer: false,
        }}
        suppliers={suppliers}
      />
    </div>
  );
}
