import { withInstall } from "../utils";
import select from "./src/select.vue";

export const OpSelect = withInstall(select);
export * from "./src/select.type"


declare module "vue" {
  export interface GlobalComponents {
    OpSelect: typeof OpSelect;
  }
}
