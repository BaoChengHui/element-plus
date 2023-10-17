import type { ElRadioProps } from "../../types";

export type RadioGroupOption = Omit<
  ElRadioProps,
  "modelValue" | "onUpdate:modelValue"
> & {
  label: string;
  value: string | number;
};
