import type { HelpersPlugin } from '@/plugins/filters'
import type { TranslationPlugin } from '@/plugins/translations'
import type {formatCurrency} from '@/plugins/currency'

export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $translations: TranslationPlugin
    $translate: TranslationPlugin['translate']
    $currency: typeof formatCurrency
    $translateWithDiff: TranslationPlugin['translateWithDiff']
    $helpers: typeof HelpersPlugin
    $replacer: (content: string) => string | undefined
  }
}