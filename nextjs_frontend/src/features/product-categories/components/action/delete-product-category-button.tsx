"use client";

import { SubmitButtonProps } from "@/interfaces/components/button";
import { IProductCategory } from "../../schemas/product-category.schema";
import { useForm } from "@/hooks/use-form";
import { deleteProductCategoryAction } from "../../actions/product-category.action";
import { Form } from "@/utils/form.utils";
import { SubmitButton } from "@/components/shared/button/submit-button";

interface DeleteProductCategoryButtonProps extends SubmitButtonProps {
  productCategory: IProductCategory;
}

export function DeleteProductCategoryButton({
  productCategory,

  ...props
}: DeleteProductCategoryButtonProps) {
  const { formAction, isPending } = useForm({
    action: deleteProductCategoryAction,
    mode: "controlled",
  });
  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: `ลบ "${productCategory.name}" ถาวร`,
        description: "การลบนี้เป็นการลบถาวร ไม่สามารถกู้คืนกลับมาได้",
      }}
    >
      <input
        type="hidden"
        name="product-category-id"
        defaultValue={productCategory.id}
      />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
