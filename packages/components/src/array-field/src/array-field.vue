<script lang="ts" setup>
import { provide } from "vue";
import { ARRAY_FIELD_CONTEXT_KEY } from "../../context";

defineOptions({
  name: "OpArrayField",
});

const props = defineProps<{
  prop: string;
}>();

provide(ARRAY_FIELD_CONTEXT_KEY, {
  prop: props.prop,
});
</script>
<template>
  <slot></slot>
</template>
