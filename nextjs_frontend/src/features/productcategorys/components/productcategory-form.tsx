"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/use-form";
import Form from "next/form";
import { createProductCategoryAction } from "../actions/productcategory.action";
import { Button } from "@/components/ui/button";

export function ProductCategoryForm() {
  const { formAction } = useForm({ action: createProductCategoryAction });
  return (
    <div>
      <Form action={formAction}>
        <div>
          <div>ประเภทของสินค้า</div>
          <Input name="productcategory-name" />
        </div>
          <Button type="submit" >Submit</Button>
      </Form>
    </div>
  );
}
