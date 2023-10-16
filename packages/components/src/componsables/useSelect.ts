import {
  ref,
  type MaybeRefOrGetter,
  computed,
  shallowRef,
  watch,
  toValue,
  type Ref,
  type ComputedRef,
} from "vue";
import type { OpSelectProps } from "../select";
import { useAsyncState, useDebounceFn } from "@vueuse/core";
import type { Option } from "element-plus/es/components/select-v2/src/select.types";

export interface UseSelectOptions<Data, Params extends any[] = []> {
  props?: MaybeRefOrGetter<
    Omit<OpSelectProps, "options" | "loading" | "remote" | "remoteMethod">
  >;
  fetch?: (...args: Params) => Promise<Data[]>;
  data?: MaybeRefOrGetter<any[]>;
  /**
   * @default true
   */
  immediate?: boolean;
  /**
   * @default 'label'
   */
  labelKey?: string;
  /**
   * @default 'value'
   */
  valueKey?: string;
  formatter?: (data: Data[]) => Option[];
  /**
   * @default false
   */
  remote?: boolean;
  /**
   * @default keyword
   */
  queryKeyword?: string;
  /**
   * @default 300
   */
  ms?:MaybeRefOrGetter<number>
}

export interface UseSelectReturn<Data, Params extends any[] = []> {
  list: Ref<Option[]>;
  remoteData: Ref<Data[]>;
  selectProps: Readonly<ComputedRef<OpSelectProps>>;
  fetchData: (...args: Params) => Promise<void>;
}

export function useSelect<Data, Params extends [object?, ...any[]] = any[]>(
  options: UseSelectOptions<Data, Params>
): UseSelectReturn<Data, Params> {
  const {
    props = {},
    fetch,
    labelKey = "label",
    valueKey = "value",
    formatter,
    immediate = true,
    remote = false,
    queryKeyword = "keyword",
    ms = 300
  } = options;
  const list = ref<Option[]>([]);
  const remoteData = ref<Data[]>([]);

  const loading = ref(false);
  const formatterData = (data: any[]): Option[] => {
    if (formatter) {
      return formatter(data);
    } else {
      return data.map((item) => {
        return {
          label: item[labelKey],
          value: item[valueKey],
        };
      });
    }
  };

  const fetchData = async (...arg: any[]) => {
    if (!fetch) {
      return;
    }
    try {
      loading.value = true;
      const res = await fetch(...(arg as Params));
      remoteData.value = res as any;
      list.value = formatterData(res);
    } finally {
      loading.value = false;
    }
  };

  const remoteMethod = useDebounceFn((val: string) => {
    if (val) {
      fetchData({
        [queryKeyword]:val
      });
    } else {
      list.value = [];
      remoteData.value = [];
    }
  },ms);

  const selectProps = computed<OpSelectProps>(() => {
    const base = remote?{
      remote,
      remoteMethod
    }:{}

    return {
      options: list.value,
      ...base,
      ...toValue(props),
    };
  });

  if (immediate) {
    fetchData();
  }
  return {
    list,
    remoteData: remoteData as Ref<Data[]>,
    selectProps,
    fetchData,
  };
}

