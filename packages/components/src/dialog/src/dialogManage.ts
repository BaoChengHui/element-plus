import { h, type Component, ref, type VNode, type ComponentPublicInstance, isVNode, provide } from "vue";
import dialog from "./dialog.vue";
import { isEmpty, isFunction, mountComponent } from "../../utils";
import type { OpDialogProps } from "./dialog.type";

export type ShowDialogOptions = OpDialogProps;

export function showDialog(
  options: ShowDialogOptions,
  dialogContent?: Component | VNode 
) {
  return new Promise((resolve, reject) => {
    const { onCalcel, onConfirm, onClosed,onOpen, ...ohterConfig } = options;
    const visible = ref(false);

    const handlerClosed = () => {
      onClosed?.();
      unmount();
    };

    const handlerOpen = ()=>{
        onOpen?.()
    }

    const handlerCancel = () => {
      options.onCalcel?.();
      reject();
    };

    const dialogContentRef = ref()

    const handlerConfirm =async () => {
        console.log(dialogContentRef.value);
        
      console.log(await dialogContentRef.value?.onConfirm?.());
      onConfirm?.();
      visible.value = false
      resolve(true);
    };

    const open = () => {
      visible.value = true;
    };
    const { instance, unmount } = mountComponent({
      render() {
        return h(
          dialog,
          {
            modelValue: visible.value,
            "onUpdate:modelValue": (val) => (visible.value = val),
            onCalcel: handlerCancel,
            onConfirm: handlerConfirm,
            onClosed: handlerClosed,
            onOpen:handlerOpen,
            ...ohterConfig,
          },
          {
            default: () => dialogContent?h(dialogContent,{ref:dialogContentRef}):undefined
          }
        );
      },
    });

    open();
  });
}
