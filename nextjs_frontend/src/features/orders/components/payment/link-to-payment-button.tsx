import { ButtonProps } from "@/interfaces/components/button";
import { IOrder } from "../../schemas/order.schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OrderUtil } from "@/utils/order.utils";

interface LinkToPaymentButtonProps extends ButtonProps {
  order: IOrder;
  children: React.ReactNode;
}

export function LinkToPaymentButton({
  order,
  children,
  ...props
}: LinkToPaymentButtonProps) {
  if (OrderUtil.check.canDoPayment(order)) return null;

  return (
    <Button {...props} asChild>
      <Link href={`/orders/${order.id}/payment`}>{children}</Link>
    </Button>
  );
}
