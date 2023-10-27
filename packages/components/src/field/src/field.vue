<script lang="tsx" setup>
import { ref, useAttrs } from "vue";
import type { FieldComponent, FieldContext } from "./field.type";
import { fieldConfigMap } from "./map";
import { h } from "vue";
import { ElFormItem, type FormItemRule } from "element-plus";
import { computed } from "vue";
import { inject } from "vue";
import { ARRAY_FIELD_CONTEXT_KEY, FORM_CONTEXT_KEY } from "../../context";
import { onMounted } from "vue";
import { reactive } from "vue";
import { onBeforeUnmount } from "vue";
import { getArrDestructorKeys, isBoolean } from "../../utils";
import { toRefs } from "vue";
import { toRef } from "vue";

defineOptions({
  name: "OpField",
  inheritAttrs: false,
});
const props = withDefaults(
  defineProps<{
    component?: FieldComponent;
    required?: boolean;
    rules?: FormItemRule[];
    tipAppendLabel?: boolean;
    label?: string;
    prop?: string
    modelValue?: any
    "onUpdate:modelValue"?: () => void
    default?: any
  }>(),
  {
    component: () => ({
      type: "input",
    }),
    rules: () => [],
    tipAppendLabel:undefined
  }
);

const formContext = inject(FORM_CONTEXT_KEY, undefined)
const arrayFieldContext = inject(ARRAY_FIELD_CONTEXT_KEY,undefined)

const updateModelValue = (val: unknown, force: boolean = true) => {
  fieldContext.modelValue = val
  formContext?.form.updateValidateModel(fieldContext.prop, fieldContext.modelValue)
  if (force) {
    formContext?.form.updateFormModel(fieldContext)
  }
}
const fieldContext: FieldContext = reactive({
  modelValue: undefined,
  updateModelValue,
  prop: "",
  names: undefined
})

onMounted(() => {
  if (props.prop) {
    const arrKeys = getArrDestructorKeys(props.prop)
    fieldContext.prop = props.prop
    if (arrKeys) {
      fieldContext.names = arrKeys
    }
    formContext?.form.linkFields(props.prop, fieldContext)
  }
})

onBeforeUnmount(() => {
  if (props.prop) {
    formContext?.form.unlinkFields(props.prop)
  }
})


const attrs = useAttrs();

const componentDetail = computed(() => {
  const { type, props: componentProps = {} } = props.component;
  const config = fieldConfigMap.get(type)!;
  return {
    component: config.component,
    props: {
      ...config.defaultProps,
      ...componentProps,
    },
  };
});



const renderFieldCompoent = () => {
  const { component, props } = componentDetail.value;
  return h(component, { ...props, modelValue: fieldContext.modelValue, 'onUpdate:modelValue': updateModelValue });
};

const itemRules = computed(()=>{
  const { rules, required, tipAppendLabel, label } = props;
  
  const innerTipAppendLabel = isBoolean(tipAppendLabel)?tipAppendLabel:!!formContext?.tipAppendLabel
  
  const { props: componentProps } = componentDetail.value;
  if (required) {
    let message;
    if (componentProps.placeholder) {
      message = componentProps.placeholder;
    }
    if (innerTipAppendLabel && label) {
      message = message + label;
    }
    return [
      ...rules,
      {
        required: true,
        message,
      }
    ]
  }
  return rules;
})


const renderFormItem = () => {
  const { label, prop } = props;
  return (
    <ElFormItem {...attrs} rules={itemRules.value} label={label} prop={prop}>
      {renderFieldCompoent()}
    </ElFormItem>
  );
};

defineRender(renderFormItem());
</script>
