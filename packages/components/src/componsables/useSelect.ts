import { ref, type MaybeRefOrGetter, computed } from "vue";
import type { OpSelectProps } from "../select";
import { useAsyncState } from "@vueuse/core";
import type { Option } from "element-plus/es/components/select-v2/src/select.types";

export interface UseSelectOptions {
  props?: MaybeRefOrGetter<OpSelectProps>;
  fetch?: () => Promise<any[]>;
  /**
   * @default label
   */
  labelKey?: string;
  /**
   * @default value
   */
  valueKey?: string;
  formatter?: (data: any[]) => Option[];
  remote?: boolean;
  data?:any[]
}

export interface UseSelectReturn {

}

export function useSelect(options: UseSelectOptions) {
  const { props = {}, fetch} = options;
  const list = ref<Option[]>([])
  
  const fetchData = ()=>{
    if(!fetch){
        return 
    }
  }


  const selectProps = computed<OpSelectProps>(()=>{
    return {
        options:list.value
    }
  })

  return {
    list,
    selectProps,
    fetchData
  }
}
