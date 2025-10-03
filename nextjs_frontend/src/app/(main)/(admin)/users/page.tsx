import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { UserContainer } from "@/features/users/components/user-container";
import { getUserList } from "@/features/users/services/user.service";
import { AuthClient } from "@/utils/auth.utils";

export default async function UserPage() {
  const { token } = await AuthClient.getInstance().getAuthenticatedUser();

  const users = await getUserList(token);

  return (
    <div className="main-container">
      <Header title="พนักงาน" description="จัดการพนักงานทั้งหมด" />
      <Separator />
      <UserContainer users={users} />
    </div>
  );
}
