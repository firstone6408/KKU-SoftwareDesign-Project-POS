import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { AuthClient } from "@/utils/auth.utils";

export default async function ProductPage() {
  const {} = await AuthClient.getInstance().getAuthenticatedUser();
  return (
    <div className="main-container">
      {/* Header */}
      <Header
        title="สินค้า"
        description="สำหรับการเพิ่ม ลบ แก้ไข เกี่ยวกับผู้จัดจำหน่าย"
      />
      <Separator />

      {/* Form */}

      {/* Table */}
    </div>
  );
}
