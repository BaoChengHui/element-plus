import { ref, type MaybeRefOrGetter, computed, shallowRef } from "vue";
import type { OpSelectProps } from "../select";
import { useAsyncState } from "@vueuse/core";
import type { Option } from "element-plus/es/components/select-v2/src/select.types";

export interface UseSelectOptions<Params,Data> {
  props?: MaybeRefOrGetter<OpSelectProps>;
  fetch?:  (params:Params) => Promise<Data[]>
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
  remoteKeywordKey?:string
  data?: any[];
}

export interface UseSelectReturn {}

export function useSelect<Data, Params extends any[] = []>(
  options: UseSelectOptions<Params,Data>
) {
  const { props = {}, fetch } = options;
  const list = ref<Option[]>([]);
  const remoteData = ref<Data[]>([])


  const loading = ref(false)
  const fetchData = async(params:Params) => {
    if (!fetch) {
      return;
    }
    try {
      const res = await fetch(params)
      remoteData.value = res as any
    } catch (error) {
      
    } 
    
    // const {isLoading} = useAsyncState();
  };

  const selectProps = computed<OpSelectProps>(() => {
    return {
      options: list.value,
    };
  });

  return {
    list,
    selectProps,
    fetchData,
    remoteData
  };
}

const fetchList = async():Promise<{name:string,value?:string}[]>=>{
  return [{name:"111",value:"222"},{name:"111"}]
}

const {remoteData} = useSelect({
  fetch:fetchList
})