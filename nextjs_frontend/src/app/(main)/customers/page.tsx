import { CustomerForm } from "@/features/customers/components/customer-form";
import { CustomerListTable } from "@/features/customers/components/customer-list-table";
import { getCustomerList } from "@/features/customers/services/customer.service";

export default async function CustomerPage() {
  const customers = await getCustomerList();
  return (
    <div className="main-container">
      <CustomerForm />
      {/* Table */}
      <CustomerListTable customers={customers} />
    </div>
  );
}
