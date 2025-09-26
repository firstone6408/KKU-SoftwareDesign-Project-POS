import { OrderSummary } from "@/features/orders/components/working/summary/order-summary";
import { getOrderById } from "@/features/orders/services/order.service";
import { getProductList } from "@/features/products/services/product.service";
import { AuthClient } from "@/utils/auth.utils";
import { redirect } from "next/navigation";
import { ProductList } from "@/features/orders/components/working/list/product-list";
import { OrderUtil } from "@/utils/order.utils";

interface OrderWorkingPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderWorkingPage({
  params,
}: OrderWorkingPageProps) {
  const { token } = await AuthClient.getInstance().getAuthenticatedUser();
  const { id } = await params;

  const order = await getOrderById(token, id);
  if (!order || OrderUtil.check.canDoWorking(order)) {
    redirect("/orders");
  }

  const products = await getProductList(token);

  return (
    <div className="main-container h-[calc(100vh-100px)]">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Product List */}
        <ProductList order={order} products={products} />

        {/* Summary */}
        <OrderSummary order={order} />
      </div>
    </div>
  );
}
