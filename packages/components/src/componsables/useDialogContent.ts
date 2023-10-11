import { getCurrentInstance } from "vue"

export interface UseDialogContent{
    onOpen?:()=>void
    onConfirm?:()=>Promise<any>
}

export function useDialogContent(options:UseDialogContent) {
   
  const instance = getCurrentInstance()!
   Object.assign(instance,options)
}