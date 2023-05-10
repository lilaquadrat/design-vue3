import type iconsPartialVue from '@/components/partials/icons.partial.vue';
import type linkGroupPartialVue from '@/components/partials/link-group.partial.vue';
import type listPartialVue from '@/components/partials/list.partial.vue';
import type textblockPartialVue from '@/components/partials/textblock.partial.vue';
import type blogIntroModuleVue from '@/components/modules/blog-intro.module.vue';
import type compareModuleVue from '@/components/modules/compare.module.vue';
import type contentModuleVue from '@/components/modules/content.module.vue';
import type cookiesModuleVue from '@/components/modules/cookies.module.vue';
import type emotionModuleVue from '@/components/modules/emotion.module.vue';
import type factsModuleVue from '@/components/modules/facts.module.vue';
import type faqModuleVue from '@/components/modules/faq.module.vue';
import type footerModuleVue from '@/components/modules/footer.module.vue';
import type galleryModuleVue from '@/components/modules/gallery.module.vue';
import type indexModuleVue from '@/components/modules/index.module.vue';
import type menuModuleVue  from '@/components/modules/menu.module.vue';
import type partialModuleVue from '@/components/modules/partial.module.vue';
import type pictureModuleVue from '@/components/modules/picture.module.vue';
import type pictureandtextModuleVue from '@/components/modules/pictureandtext.module.vue';
import type picturegrouptModuleVue from '@/components/modules/picturegroup.module.vue';
import type quellcodeModuleVue from '@/components/modules/quellcode.module.vue';
import type quoteModuleVue from '@/components/modules/quote.module.vue';
import type textModuleVue from '@/components/modules/text.module.vue';
import type trainingModuleVue from '@/components/modules/training.module.vue';
import type videoModuleVue from '@/components/modules/video.module.vue';
import type pricesModuleVue from '@/components/modules/prices.module.vue';
import type accordianPartialVue from '@/components/partials/accordian.partial.vue';
import type buttonGroupPartialVue from '@/components/partials/button-group.partial.vue';
import type buttonPartialVue from '@/components/partials/button.partial.vue';
import type checkboxPartialVue from '@/components/partials/checkbox.partial.vue';
import type clientOnlyPartialVue from '@/components/partials/client-only.partial.vue';
import type descriptionPartialVue from '@/components/partials/description.partial.vue';
import type dialogPartialVue from '@/components/partials/dialog.partial.vue';
import type factPartialVue from '@/components/partials/fact.partial.vue';
import type highlightPartialVue from '@/components/partials/highlight.partial.vue';
import type legendPartialVue from '@/components/partials/legend.partial.vue';
import type linkPartialVue from '@/components/partials/link.partial.vue';
import type overlayBackgroundPartialVue from '@/components/partials/overlay-background.partial.vue';
import type picturePartialVue from '@/components/partials/picture.partial.vue';
import type quotePartial from '@/components/partials/quote.partial.vue';
import type videoPartialVue from '@/components/partials/video.partial.vue';



declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'lila-accordion': typeof accordianPartialVue
    'lila-button-grou': typeof buttonGroupPartialVue
    'lila-button': typeof buttonPartialVue
    'checkbox': typeof checkboxPartialVue
    'client-only-placeholder': typeof clientOnlyPartialVue
    'lila-description-partial': typeof descriptionPartialVue
    'lila-dialog-partial': typeof dialogPartialVue
    'lila-fact-partial': typeof factPartialVue
    'lila-highlight': typeof highlightPartialVue
    'lila-icons-partial': typeof iconsPartialVue
    'lila-legend': typeof legendPartialVue
    'lila-link': typeof linkPartialVue
    'lila-link-group-partial': typeof linkGroupPartialVue
    'lila-list-links': typeof listPartialVue
    'lila-overlay-background': typeof overlayBackgroundPartialVue
    '"lila-figure': typeof picturePartialVue
    'lila-quote': typeof quotePartial
    'lila-textblock-partial': typeof textblockPartialVue
    'lila-video-partial': typeof videoPartialVue
    
    'lila-blog-intro-module': typeof blogIntroModuleVue
    'lila-compare-module': typeof  compareModuleVue
    'lila-content-module': typeof contentModuleVue
    'lila-cookies-module': typeof cookiesModuleVue
    'emotion-module': typeof emotionModuleVue
    'lila-facts-module': typeof factsModuleVue
    'lila-faq-module ': typeof faqModuleVue
    'lila-footer-module' :typeof footerModuleVue
    'gallery-module': typeof galleryModuleVue
    'lila-index-module': typeof indexModuleVue
    'lila-menu-module': typeof menuModuleVue
    'lila-partial-container': typeof partialModuleVue
    'lila-picture-module': typeof pictureModuleVue
    'lila-pictureandtext-module': typeof pictureandtextModuleVue
    'lila-picturegroup-modul': typeof picturegrouptModuleVue
    'lila-prices-module' : typeof pricesModuleVue
    'lila-quellcode-module': typeof quellcodeModuleVue
    'lila-quote-module': typeof quoteModuleVue
    'lila-text-module': typeof textModuleVue
    'lila-training-modul': typeof trainingModuleVue
    'lila-video-module': typeof videoModuleVue

  }
}