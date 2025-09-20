import { Header } from "@/components/shared/header/header";
import { getCustomerList } from "@/features/customers/services/customer.service";

export default async function Home() {
  const customers = await getCustomerList();

  //console.log(customers);
  return (
    <div className="main-container">
      <Header title="Customer" description="asdasdasd" />
      <div>ok</div>
    </div>
  );
}
