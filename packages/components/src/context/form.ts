import type { InjectionKey } from "vue";
import type { BindForm } from "../form";

export const FORM_CONTEXT_KEY = Symbol('formContextKey') as InjectionKey<{
    form:BindForm
    tipAppendLabel:boolean
}>