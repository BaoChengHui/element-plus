import type { ElSelectProps, ElSelectV2Props, PickComponentProps } from "../../types";
import type selectVue from "./select.vue";

export type OpSelectProps = PickComponentProps<typeof selectVue> & ElSelectProps & ElSelectV2Props
