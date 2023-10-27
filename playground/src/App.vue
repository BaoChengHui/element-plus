<script setup lang="tsx">
import { createForm } from 'op-components';



const form = createForm<{name:string,phone:string,start:string,end:string}>({
  initialValues:{
    name:"111",
    phone:"222",
    start:"2023-09-10",
    end:"2023-10-10"
  }
})
setTimeout(() => {
  form.formModel.phone = "8888888"
  form.formModel.start = "2023-09-10"
  form.formModel.end = "2023-10-10"
}, 3000);
</script>

<template>
  <div class="app">
    <OpForm :form="form" >
      <OpField label="姓名" prop="name" required ></OpField>
      <OpField label="手机" prop="phone" ></OpField>
      <OpField label="时间" prop="[start,end]" :component="{type:'daterange'}" required></OpField>
    </OpForm>
  </div>
</template>

<style>
.app {
  padding: 16px;
}
</style>
