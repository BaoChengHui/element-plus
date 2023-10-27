import type { Component } from "vue";
import type { Recordable } from "../../types";
import type { FieldType } from "./field.type";
import { ElDatePicker, ElInput, ElInputNumber } from "element-plus";


interface FieldConfig {
  component: Component;
  defaultProps?: Recordable;
}


export const fieldConfigMap = new Map<FieldType, FieldConfig>([
  [
    'input', {
      component: ElInput,
      defaultProps: {
        placeholder: '请输入',
      },
    },
  ],
  [
    'inputNumber', {
      component: ElInputNumber,
      defaultProps: {
        placeholder: '请输入',
      },
    },
  ],
  [
    'daterange', {
      component: ElDatePicker,
      defaultProps: {
        placeholder: '请选择',
        valueFormat: 'YYYY-MM-DD',
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
  ],
  // [
  //   'select', {
  //     component: OpSelect,
  //     defaultProps: {
  //       placeholder: '请选择',
  //     },
  //   },
  // ],
  // [
  //   'switch', {
  //     component: ElSwitch,
  //   },
  // ],
  // [
  //   'datePicker', {
  //     component: ElDatePicker,
  //     defaultProps: {
  //       placeholder: '请选择',
  //       valueFormat: 'YYYY-MM-DD',
  //       type: 'date',
  //     },
  //   },
  // ],
  
])