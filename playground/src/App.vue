<script setup lang="tsx">
import  { ElButton, type DialogBeforeCloseFn, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import {showDialog  } from "op-components";
import DemoCom from "./components/DemoCom.vue";

const visible = ref(false)

const handlerCancel = ()=>{
  console.log("1111");
}

const handlerClick = ()=>{
  showDialog({
    title:"1111"
  }, <DemoCom name='111111'/>).then(res=>{
    
  })
}

</script>

<template>
  <div >
    <ElButton @click="handlerClick">打开</ElButton>
    <OpDialog v-model="visible" @calcel="handlerCancel" title="这是标题">
    <div>1111</div>
    </OpDialog>
  </div>
</template>

<style scoped>

</style>
