import { ButtonProps } from "@/interfaces/components/button";
import { IOrder } from "../../schemas/order.schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LinktoReceiptButtonProps extends ButtonProps {
  order: IOrder;
  children: React.ReactNode;
}

export function LinktoReceiptButton({
  order,
  children,
  ...props
}: LinktoReceiptButtonProps) {
  return (
    <Button asChild {...props}>
      <Link href={`/orders/${order.id}/receipt`}>{children}</Link>
    </Button>
  );
}
