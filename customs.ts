import type { HelpersPlugin } from '@/plugins/filters'
import type { TranslationPlugin } from '@/plugins/translations'

export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $translations: TranslationPlugin
    $translate: TranslationPlugin['translate']
    $translateWithDiff: TranslationPlugin['translateWithDiff']
    $helpers: typeof HelpersPlugin
    $replacer: (content: string) => string | undefined
  }
}