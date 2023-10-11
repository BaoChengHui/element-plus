<script lang="ts" setup>
import { ElDialog, ElButton, type DialogBeforeCloseFn } from "element-plus";
import { useVModels } from "@vueuse/core";

defineOptions({
  name: "OpDialog",
});

const props = withDefaults(
  defineProps<{
    cancelText?: string;
    showCancel?: boolean;
    cancelLoading?: boolean;
    cancelDisabled?: boolean;
    confirmText?: string;
    showConfirm?: boolean;
    confirmLoading?: boolean;
    confirmDisabled?: boolean;
    onCalcel?: () => void;
    onConfirm?: () => void;
    showFooter?:boolean
    modelValue?: boolean;
    "onUpdate:modelValue"?: (val: boolean) => void;
  }>(),
  {
    cancelText: "取消",
    showCancel: true,
    confirmText: "确定",
    showConfirm: true,
    showFooter:true
  }
);

const { modelValue: visible } = useVModels(props);
const handlerCancel = () => {
  visible.value = false;
  props.onCalcel?.();
};

const handlerConfirm = () => {
  props.onConfirm?.();
};
</script>
<template>
  <ElDialog v-model="visible">
    <template #header>
        <slot v-if="$slots.header" name="header">
    </slot>
    </template>
    
    <slot></slot>
    <template #footer>
      <slot name="footer" v-if="showFooter">
        <ElButton
          v-if="showCancel"
          @click="handlerCancel"
          :loading="cancelLoading"
          :disabled="cancelDisabled"
          >{{ cancelText }}</ElButton
        >
        <ElButton
          v-if="showConfirm"
          type="primary"
          @click="handlerConfirm"
          :loading="confirmLoading"
          :disabled="confirmDisabled"
          >{{ confirmText }}</ElButton
        >
      </slot>
    </template>
  </ElDialog>
</template>
