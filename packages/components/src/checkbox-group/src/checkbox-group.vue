<script lang="tsx" setup>
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup } from "element-plus";
import type { CheckboxGroupOption } from "./checkbox-group.type";
import { computed } from "vue";
import { h } from "vue";
defineOptions({
  name: "OpCheckboxGroup",
});

const props = withDefaults(
  defineProps<{
    options?: CheckboxGroupOption[];
    type?: "default" | "button";
  }>(),
  {
    options: () => [],
    type: "default",
  }
);

const CheckboxItem = computed(() =>
  props.type === "button" ? ElCheckboxButton : ElCheckbox
);

const slots = defineSlots<{
  default(props: { item: CheckboxGroupOption }): any;
}>();

defineRender(
  <ElCheckboxGroup>
    {props.options.map((item) => {
      const {
        value,
        label,
        ...others
      } = item;
      const config = {
        ...others,
        label: value ?? label,
      };
      return h(CheckboxItem.value, { ...config }, {default:slots.default?slots.default({item}):()=>item.label});
    })}
  </ElCheckboxGroup>
);
</script>
