"use client";

import { Button } from "@/components/ui/button";
import { IOrder } from "../schemas/order.schema";
import Link from "next/link";
import {
  Banknote,
  EllipsisVertical,
  NotebookPen,
  ReceiptText,
  Trash,
  X,
} from "lucide-react";
import { DeleteOrderButton } from "./delete-order-button";
import { LinkToPaymentButton } from "./payment/link-to-payment-button";
import { OrderUtil } from "@/utils/order.utils";
import { CancelOrderButton } from "./candel-order-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkToOrderDetailButton } from "./detail/link-to-order-detail-button";

interface OrderActionProps {
  order: IOrder;
}

export function OrderAction({ order }: OrderActionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {!OrderUtil.check.isClosed(order) &&
        !OrderUtil.check.isCanceled(order) ? (
          <>
            {/* Payment */}
            <DropdownMenuItem asChild>
              <LinkToPaymentButton
                order={order}
                variant={"ghost"}
                className="w-full flex justify-start"
                asChild
              >
                <Banknote />
                <span>ชำระเงิน</span>
              </LinkToPaymentButton>
            </DropdownMenuItem>
            {/* Working */}
            <DropdownMenuItem asChild>
              <Button variant={"ghost"} asChild>
                <Link
                  href={`/orders/${order.id}/working`}
                  className="w-full flex justify-start"
                >
                  <NotebookPen />
                  <span>ดำเนินการ</span>
                </Link>
              </Button>
            </DropdownMenuItem>

            {/* Cancel */}
            <DropdownMenuItem
              asChild
              onSelect={(event) => event.preventDefault()}
            >
              <CancelOrderButton
                variant={"ghost"}
                order={order}
                icon={X}
                className="w-full flex justify-start"
              >
                ยกเลิก
              </CancelOrderButton>
            </DropdownMenuItem>

            {/* Delete */}
            <DropdownMenuItem
              asChild
              onSelect={(event) => event.preventDefault()}
            >
              <DeleteOrderButton
                variant={"ghost"}
                order={order}
                icon={Trash}
                className="w-full flex justify-start"
              >
                ลบ
              </DeleteOrderButton>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {/* Detail */}
            <DropdownMenuItem asChild>
              <LinkToOrderDetailButton
                order={order}
                variant={"ghost"}
                className="w-full flex justify-start"
                asChild
              >
                <ReceiptText />
                <span>รายละเอียดคำสั่งซื้อ</span>
              </LinkToOrderDetailButton>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
