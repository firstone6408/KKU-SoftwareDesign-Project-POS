import { SelectArrObjField } from "@/components/shared/field/select-field";
import { IProductCategory } from "../schemas/product-category.schema";
import {
  LabeledControl,
  LabeledControlProps,
} from "@/components/shared/field/labeled-control";
import { SelectFieldProps } from "@/interfaces/components/select";

interface ProductCategorySelectFormProps
  extends SelectFieldProps,
    LabeledControlProps {
  categories: IProductCategory[];
  className?: string;
}

export function ProductCategorySelect({
  label,
  errorMessage,
  categories,
  required,
  name,
  ...props
}: ProductCategorySelectFormProps) {
  const filtered = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));
  return (
    <LabeledControl
      label={label}
      name={name}
      required={required}
      errorMessage={errorMessage}
    >
      <SelectArrObjField
        data={filtered}
        placeholder={"เลือกประเภทสินค้า"}
        required={required}
        name={name}
        {...props}
      />
    </LabeledControl>
  );
}
