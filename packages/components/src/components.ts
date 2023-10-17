import type { Plugin } from "vue";
import { OpDialog } from "./dialog";
import { OpSelect } from "./select";
import { OpCheckboxGroup } from "./checkbox-group";
import { OpRadioGroup } from "./radio-group";

export default [OpDialog, OpSelect, OpCheckboxGroup, OpRadioGroup] as Plugin[];
