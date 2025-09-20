"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/use-form";
import Form from "next/form";
import { createCustomerAction } from "../actions/customer.action";
import { Button } from "@/components/ui/button";

export function CustomerForm() {
  const { formAction } = useForm({ action: createCustomerAction });
  return (
    <div>
      <Form action={formAction}>
        <div>
          <div>ชื่อลูกค้า</div>
          <Input name="customer-name" />
        </div>
        <div>
          <div>ติดต่อ</div>
          <Input name="customer-contract" />
        </div>
        <div className="mt-8">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
}
