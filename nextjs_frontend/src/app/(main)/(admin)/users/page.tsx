import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { CreateUserButton } from "@/features/users/components/create-user-button";
import { UserListTable } from "@/features/users/components/user-list-table";
import { getUserList } from "@/features/users/services/user.service";
import { AuthClient } from "@/utils/auth.utils";
import { Plus } from "lucide-react";

export default async function UserPage() {
  const { token } = await AuthClient.getInstance().getAuthenticatedUser();

  const users = await getUserList(token);

  return (
    <div className="main-container">
      <Header title="พนักงาน" description="จัดการพนักงานทั้งหมด" />
      <Separator />

      {/* Create user form */}
      <div className="">
        <CreateUserButton>
          <Plus />
          <span>เพิ่มพนักงาน</span>
        </CreateUserButton>
      </div>

      {/* Table */}
      <UserListTable
        card={{
          container: true,
          header: true,
          content: true,
        }}
        users={users}
      />
    </div>
  );
}
