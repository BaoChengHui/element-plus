import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import type { FieldContext } from "../../field";
import type { Recordable } from "../../types";
import { getArrDestructorKeys, isArray, isEmpty } from "../../utils";
import { isEqual } from "lodash-es";

export interface CreateFormOptions<T extends object = any> {
  initialValues?: Partial<T>;
}

export interface BindForm<T extends object = any> {
  formModel: T;
  fields: Record<string, FieldContext>;
  linkFields: (key: string, context: FieldContext) => void;
  unlinkFields: (key: string) => void;
  updateFormModel: (context: FieldContext) => void
  validateModel:Recordable
  updateValidateModel: (key: string, val: unknown) => void
}

export function createForm<T extends Recordable = any>(
  options: CreateFormOptions<T> = {}
): BindForm<T> {
  const { initialValues = {} } = options;

  const formModel = ref<Recordable>({ ...initialValues });
  const validateModel = ref<Recordable>({})
  const fields = ref<Record<string, FieldContext>>({});

  const updateValidateModel = (key:string,val:unknown)=>{
    validateModel.value[key] = val
  }

  const updateFormModel = (context: FieldContext) => {
    console.log("updateFormModel",context);
    
    const { names, prop, modelValue } = context
    if (names) {
      names.forEach((item, index) => {
        if (isArray(modelValue)) {
          formModel.value[item] = modelValue[index]
        } else {
          formModel.value[item] = undefined
        }
      })
    } else {
      formModel.value[prop] = modelValue
    }
  }

  const getFiledValueFromModel = (context: FieldContext) => {
    if (context.names) {
      return context.names.map(item => {
        return formModel.value[item]
      }).filter(item => !isEmpty(item))
    }
    return formModel.value[context.prop]
  }

  const setFieldValue = (context: FieldContext) => {
    let val = getFiledValueFromModel(context)
    context.updateModelValue(val,false)
  }

  const linkFields = (key: string, context: FieldContext) => {
    fields.value[key] = context;
    setFieldValue(context)
  };

  const unlinkFields = (key: string) => {
    delete fields.value[key];
  };

  const initWatch = () => {
    Object.keys(fields.value).forEach(key => {
      const field = fields.value[key]
      watch(() => {
        return getFiledValueFromModel(field)
      }, (val) => {
        console.log("val-change",field);
        
        field.updateModelValue(val,false)
      })
    })
  }

  onMounted(() => {
    initWatch()
  })



  return reactive({
    formModel,
    fields,
    linkFields,
    unlinkFields,
    updateFormModel,
    validateModel,
    updateValidateModel
  }) as BindForm<T>;
}
