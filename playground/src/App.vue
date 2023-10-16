<script setup lang="tsx">
import {
  ElButton,
  type DialogBeforeCloseFn,
  ElMessageBox,
  ElSelectV2,
  ElSelect,
  ElOptionGroup,
  ElOption,
} from "element-plus";
import { ref } from "vue";
import { showDialog, useSelect } from "op-components";
import DemoCom from "./components/DemoCom.vue";

const options: { label3: string; value: string }[] = [
  { label3: "label1", value: "1" },
  { label3: "label2", value: "2" },
  { label3: "label3", value: "3" },
  { label3: "label4", value: "4" },
  { label3: "label5", value: "5" },
  { label3: "label6", value: "6" },
  { label3: "label16", value: "16" },
];
const fetchList = (data: { keyword: string }): Promise<typeof options> => {
  return new Promise((resolve, reject) => {
    const { keyword = "" } = data ?? {};
    setTimeout(() => {
      resolve(
        options.filter((item) => item.label3.includes(keyword) || !keyword)
      );
    }, 1000);
  });
};

const { selectProps } = useSelect({
  props: {
    clearable: true,
    filterable: true,
  },
});
const value = ref();
</script>

<template>
  <div class="app">
    <OpSelect v-model="value" v-bind="selectProps"> </OpSelect>
    <div></div>
  </div>
</template>

<style>
.app {
  padding: 16px;
}
</style>
