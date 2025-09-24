"use client";

import { ICustomer } from "@/features/customers/schemas/customer.schema";
import { useForm } from "@/hooks/use-form";
import { createOrderAction } from "../../actions/order.action";
import { Form } from "@/utils/form.utils";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface CreateOrderFormProps {
  customer: ICustomer;
}

export function CreateOrderForm({ customer }: CreateOrderFormProps) {
  const router = useRouter();

  const { formAction, isPending, state } = useForm({
    action: createOrderAction,
    mode: "controlled",
  });

  useEffect(() => {
    if (state && state.status === "success") {
      if (state.data) {
        const data = state.data as { orderId: string };
        router.push(`/orders/${data.orderId}/working`);
      }
    }
  }, [state, router]);

  return (
    <Form
      action={formAction}
      className="text-end"
      confirmConfig={{
        title: `สร้างคำสั่งซื้อของ "${customer.name}"`,
      }}
    >
      <input type="hidden" name="customer-id" value={customer.id} />
      <SubmitButton icon={Plus} isPending={isPending} />
    </Form>
  );
}
