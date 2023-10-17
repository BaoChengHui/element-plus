import type { ElCheckboxProps } from "../../types";

export type CheckboxGroupOption = Omit<
  ElCheckboxProps,
  "modelValue" | "onUpdate:modelValue" | "trueLabel" | "falseLabel"
> & {
  label: string;
  value: string | number;
};
