import type { ElForm } from "element-plus";
import { withInstall } from "../utils"
import form from "./src/form.vue";


export const OpForm = withInstall(form)
export * from "./src/form.type"
export * from "./src/form"

declare module "vue" {
    export interface GlobalComponents {
        OpForm: typeof OpForm & typeof ElForm
    }
}