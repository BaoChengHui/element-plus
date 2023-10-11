import type { ElDialog } from "element-plus";
import { withInstall } from "../utils";
import Dialog from "./src/dialog.vue";
import { defineComponent } from "vue";

const OpDialog = withInstall(Dialog)

export {
    OpDialog
}
export * from "./src/dialog.type"
export * from "./src/dialogManage"


declare module 'vue' {
export interface GlobalComponents {
    OpDialog: typeof OpDialog & typeof ElDialog
}
}
