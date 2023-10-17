import { withInstall } from "../utils";
import field from "./src/field.vue";

export const OpField = withInstall(field);
export * from "./src/field.type"

declare module "vue" {
  export interface GlobalComponents {
    OpField: typeof OpField;
  }
}
