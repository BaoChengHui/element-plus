<script lang="ts" setup>
import { ElForm } from "element-plus";
import type { BindForm } from "./form";
import { provide } from "vue";
import { FORM_CONTEXT_KEY } from "../../context";

defineOptions({
  name: "OpForm",
});

const props = defineProps<{
  form: BindForm;
  tipAppendLabel?:boolean
}>();

provide(FORM_CONTEXT_KEY, {
  form: props.form,
  tipAppendLabel:props.tipAppendLabel
});
</script>
<template>
  <ElForm :model="form.validateModel">
    <slot></slot>
  </ElForm>
</template>
