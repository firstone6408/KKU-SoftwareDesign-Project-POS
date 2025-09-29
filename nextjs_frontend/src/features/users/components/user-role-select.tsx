import {
  LabeledControl,
  LabeledControlProps,
} from "@/components/shared/field/labeled-control";
import { SelectFieldProps } from "@/interfaces/components/select";
import { SelectArrObjField } from "@/components/shared/field/select-field";
import { UserRoleEnum } from "../services/user.enum";
import { TransaleEnumUtil } from "@/utils/translate-enum.utils";

interface UserRoleSelectProps
  extends SelectFieldProps,
    LabeledControlProps {
  className?: string;
}

export function UserRoleSelect({
  label,
  name,
  errorMessage,
  required,
  ...props
}: UserRoleSelectProps) {
  const filtered = Object.values(UserRoleEnum).map((s) => ({
    value: s,
    label: s,
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
        placeholder={"เลือกตำแแหน่ง"}
        translateFn={TransaleEnumUtil.userRole}
        required={required}
        name={name}
        {...props}
      />
    </LabeledControl>
  );
}
