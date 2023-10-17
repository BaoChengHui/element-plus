import type { ElCheckboxGroup } from "element-plus";
import { withInstall } from "../utils";
import checkboxGroup from "./src/checkbox-group.vue";
import { defineComponent } from "vue";

const OpCheckboxGroup = withInstall(checkboxGroup)

export {
    OpCheckboxGroup
}



declare module 'vue' {
export interface GlobalComponents {
    OpCheckboxGroup: typeof OpCheckboxGroup & typeof ElCheckboxGroup
}
}
