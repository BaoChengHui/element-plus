import type {  ElRadioGroup } from "element-plus";
import { withInstall } from "../utils";
import radioGroup from "./src/radio-group.vue";

const OpRadioGroup = withInstall(radioGroup)

export {
    OpRadioGroup
}
export * from "./src/radio-group.type"


declare module 'vue' {
export interface GlobalComponents {
    OpRadioGroup: typeof OpRadioGroup & typeof ElRadioGroup
}
}
