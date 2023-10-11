import type { ELDialogProps, PickComponentProps } from "../../types";
import type dialogVue from "./dialog.vue";

export type OpDialogProps = PickComponentProps<typeof dialogVue> & ELDialogProps
