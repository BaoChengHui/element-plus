<script lang="tsx" setup>
import { ElRadio, ElRadioButton, ElRadioGroup } from "element-plus";
import type { RadioGroupOption } from "./radio-group.type";
import { computed, h } from "vue";
defineOptions({
  name: "OpRadioGroup",
});

const props = withDefaults(
  defineProps<{
    options?: RadioGroupOption[];
    type?: "default" | "button";
  }>(),
  {
    options: () => [],
    type: "default",
  }
);

const RadioItem = computed(() =>
  props.type === "button" ? ElRadioButton : ElRadio
);

const slots = defineSlots<{
  default(props: { item: RadioGroupOption }): any;
}>();

defineRender(
  <ElRadioGroup>
    {props.options.map((item) => {
      const { value, label, ...others } = item;
      const config = {
        ...others,
        label: value ?? label,
      };
      return h(
        RadioItem.value,
        { ...config },
        { default: slots.default ? slots.default({ item }) : () => item.label }
      );
    })}
  </ElRadioGroup>
);
</script>
