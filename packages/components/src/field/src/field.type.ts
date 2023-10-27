import type { ElInputProps, ElInputNumberProps, ElDatePickerProps } from "../../types";

export type FieldType = "input" | "inputNumber" | "daterange";


export type InputFieldProps = ElInputProps
export type InputNumberFieldProps = ElInputNumberProps
export type DaterangeFieldProps = ElDatePickerProps

export interface FieldComponentProps {
  input: InputFieldProps;
  inputNumber: InputNumberFieldProps;
  daterange: DaterangeFieldProps
}

type GetProps<T extends FieldType> = T extends FieldType ?{ type: T; props?: FieldComponentProps[T] } : never

export type FieldComponent = GetProps<FieldType>


export interface FieldContext {
  modelValue:any
  updateModelValue: (val: unknown,force?:boolean) => void
  prop:string
  names?:string[]
}