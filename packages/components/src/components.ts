import type { Plugin } from 'vue'
import { OpDialog } from './dialog'
import { OpSelect } from './select'
import { OpCheckboxGroup } from './checkbox-group'

export default [OpDialog,OpSelect, OpCheckboxGroup] as Plugin[]