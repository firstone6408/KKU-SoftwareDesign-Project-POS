import {
  LabeledControl,
  LabeledControlProps,
} from "@/components/shared/field/labeled-control";
import { SelectFieldProps } from "@/interfaces/components/select";
import { ISupplier } from "../schemas/supplier.schema";
import { SelectArrObjField } from "@/components/shared/field/select-field";

interface SupplierSelectProps
  extends SelectFieldProps,
    LabeledControlProps {
  suppliers: ISupplier[];
  className?: string;
}

export function SupplierSelect({
  label,
  name,
  errorMessage,
  required,
  suppliers,
  ...props
}: SupplierSelectProps) {
  const filtered = suppliers.map((s) => ({
    value: s.id,
    label: s.name,
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
        placeholder={"เลือกผู้จัดจำหน่าย"}
        required={required}
        name={name}
        {...props}
      />
    </LabeledControl>
  );
}
