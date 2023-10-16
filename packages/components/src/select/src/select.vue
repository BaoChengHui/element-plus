<script lang="tsx" setup>
import { ElOption, ElSelect, ElSelectV2, ElOptionGroup } from "element-plus";
import type {
  OptionType,
  Option,
} from "element-plus/es/components/select-v2/src/select.types";
import { isArray } from "../../utils";
import { ref } from "vue";
import { useAttrs } from "vue";
import { watchEffect } from "vue";

defineOptions({
  name: "OpSelect",
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    options: OptionType<any>[];
    virtualized?: boolean;
    modelValue?: string | number | boolean | Record<string, any> | unknown[];
    "onUpdate:modelValue"?: (val: any) => void;
  }>(),
  {
    options: () => [],
    virtualized: false,
    modelValue: undefined,
  }
);

const slots = defineSlots<{
  default(props: { item: Option }): any;
  prefix: any;
  empty: any;
}>();

const localValue = ref();
const attrs = useAttrs();

const updateModelValue = (val: any) => {
  localValue.value = val;
  props["onUpdate:modelValue"]?.(val);
};

watchEffect(() => {
  localValue.value = props.modelValue;
});

const renderSelectV2 = () => {
  return (
    <ElSelectV2
      {...attrs}
      options={props.options}
      modelValue={localValue.value}
      onUpdate:modelValue={updateModelValue}
      v-slots={slots}
    ></ElSelectV2>
  );
};

const renderOption = (option: Option) => {
  return (
    <ElOption label={option.label} value={option.value}>
      {slots.default?.({ item: option })}
    </ElOption>
  );
};

const selectSlots = {
  prefix: slots.prefix,
  empty: slots.empty,
};

const renderSelect = () => {
  return (
    <ElSelect
      modelValue={localValue.value}
      onUpdate:modelValue={updateModelValue}
      v-slots={selectSlots}
    >
      {props.options.map((option) => {
        const isGroup = isArray(option.options);
        return isGroup ? (
          <ElOptionGroup>
            {(option.options as any[]).map((item) => renderOption(item))}
          </ElOptionGroup>
        ) : (
          renderOption(option as Option)
        );
      })}
    </ElSelect>
  );
};
defineRender(props.virtualized ? renderSelectV2() : renderSelect());
</script>
