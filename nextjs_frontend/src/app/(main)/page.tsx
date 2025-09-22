import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { AuthClient } from "@/utils/auth.utils";

export default async function HomePage() {
  const {} = await AuthClient.getInstance().getAuthenticatedUser();

  return (
    <div className="main-container">
      <Header title="Dashboard" description="แสดงการรายงานผลทั้งหมด" />
      <Separator />
    </div>
  );
}
