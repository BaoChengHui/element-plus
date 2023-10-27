import type { InjectionKey } from "vue"

export const ARRAY_FIELD_CONTEXT_KEY = Symbol('arrayFieldContextKey') as InjectionKey<{
    prop:string
}>