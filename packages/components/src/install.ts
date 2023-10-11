import type { App } from 'vue'
import Components from './components'

export function install(app: App) {
  Components.forEach((item) => {
    app.use(item)
  })
}
