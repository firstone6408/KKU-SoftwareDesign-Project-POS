"use client";

import { Button } from "@/components/ui/button";
import { IOrder } from "../schemas/order.schema";
import Link from "next/link";
import { Banknote, ReceiptText, Trash, X } from "lucide-react";
import { DeleteOrderButton } from "./delete-order-button";
import { LinkToPaymentButton } from "./payment/link-to-payment-button";
import { OrderUtil } from "@/utils/order.utils";
import { CancelOrderButton } from "./candel-order-button";

interface OrderActionProps {
  order: IOrder;
}

export function OrderAction({ order }: OrderActionProps) {
  return (
    <div className="flex gap-2">
      {!OrderUtil.check.isCanceled(order) && (
        <>
          <LinkToPaymentButton order={order} variant={"outline"} asChild>
            <Banknote />
          </LinkToPaymentButton>
          {!OrderUtil.check.isClosed(order) && (
            <>
              <Button variant={"outline"} asChild>
                <Link href={`/orders/${order.id}/working`}>
                  <ReceiptText />
                </Link>
              </Button>
              <DeleteOrderButton
                order={order}
                variant={"destructive"}
                icon={Trash}
              />
            </>
          )}
          <CancelOrderButton
            order={order}
            variant={"destructive"}
            icon={X}
          />
        </>
      )}
    </div>
  );
}
