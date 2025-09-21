import { SuppliersListTable } from "@/features/suppliers/components/suppliers-list-table";
import { getSupplierList } from "@/features/suppliers/services/suppliers.service";

export default async function SupplierPage() {
    const suppliers = await getSupplierList();
    return (
        <div className="main-container">
            {/* Table */}
            <SuppliersListTable suppliers={suppliers} />
        </div>
    );
}
