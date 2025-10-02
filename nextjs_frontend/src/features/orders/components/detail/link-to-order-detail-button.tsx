import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/interfaces/components/button";
import Link from "next/link";
import { IOrder } from "../../schemas/order.schema";

interface LinkToOrderDetailButtonProps extends ButtonProps {
  order: IOrder;
  children: React.ReactNode;
}

export function LinkToOrderDetailButton({
  order,
  children,
  ...props
}: LinkToOrderDetailButtonProps) {
  return (
    <Button {...props} asChild>
      <Link href={`/orders/${order.id}`}>{children}</Link>
    </Button>
  );
}
