import { withInstall } from "../utils"
import form from "./src/form.vue";


export const OpForm = withInstall(form)
export * from "./src/form.type"

declare module "vue" {
    export interface GlobalComponents {
        OpForm: typeof OpForm 
    }
}