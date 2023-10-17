import type { Plugin } from "vue";
import { OpDialog } from "./dialog";
import { OpSelect } from "./select";
import { OpCheckboxGroup } from "./checkbox-group";
import { OpRadioGroup } from "./radio-group";
import { OpField } from "./field";
import { OpForm } from "./form";

export default [
  OpDialog,
  OpSelect,
  OpCheckboxGroup,
  OpRadioGroup,
  OpField,
  OpForm,
] as Plugin[];
