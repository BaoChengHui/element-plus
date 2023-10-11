<script lang="ts" setup>
import { useDialogContent } from "op-components";
defineOptions({
    name:"DemoCOm"
})

defineProps({
    name:String
})

useDialogContent({
    async onConfirm() {
        return {
            name:"111",
            data:234
        }
    },
})

// defineExpose({
//     async onConfirm() {
//         return {
//             name:"111",
//             data:234
//         }
//     },
// })

</script>
<template>
    {{ name }}
</template>