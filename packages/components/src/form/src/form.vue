<script lang="ts" setup>
import { ElForm } from "element-plus";

defineOptions({
    name:"OpForm"
})

</script>
<template>
    <ElForm >
        <slot></slot>
    </ElForm>
</template>