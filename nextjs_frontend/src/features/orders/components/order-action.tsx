import { Button } from "@/components/ui/button";
import { IOrder } from "../schemas/order.schema";
import Link from "next/link";
import { Banknote, ReceiptText, Trash } from "lucide-react";

interface OrderActionProps {
  order: IOrder;
}

export function OrderAction({ order }: OrderActionProps) {
  return (
    <div className="space-x-2">
      <Button variant={"outline"} asChild>
        <Link href={`/orders/${order.id}/payment`}>
          <Banknote />
        </Link>
      </Button>
      <Button variant={"outline"} asChild>
        <Link href={`/orders/${order.id}/working`}>
          <ReceiptText />
        </Link>
      </Button>
      <Button variant={"destructive"}>
        <Trash />
      </Button>
    </div>
  );
}
