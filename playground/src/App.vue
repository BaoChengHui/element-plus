<script setup lang="tsx">
import  { ElButton, type DialogBeforeCloseFn, ElMessageBox,ElSelectV2,ElSelect, ElOptionGroup,ElOption } from 'element-plus';
import { ref } from 'vue';
import {showDialog  } from "op-components";
import DemoCom from "./components/DemoCom.vue";
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const options = Array.from({ length: 10 }).map((_, idx) => {
  const label = idx + 1
  return {
    value: `Group ${label}`,
    label: `Group ${label}`,
    options: Array.from({ length: 10 }).map((_, idx) => ({
      value: `Option ${idx + 1 + 10 * label}`,
      label: `${initials[idx % 10]}${idx + 1 + 10 * label}`,
    })),
  }
})

const value = ref()
const count = ref(1)
</script>

<template>
  <div class="app" >
    <OpSelect v-model="value" :options="options" clearable >
      <template #default="{ item }">
        {{ item.label }}222
      </template>
      <template #prefix>111</template>
    </OpSelect>
    <div>
    </div>
  </div>
</template>

<style >
.app{
  padding: 16px;
}
</style>
