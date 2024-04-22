import type overlayBackgroundPartialVue from '@/components/partials/overlay-background.partial.vue';
import type checkboxPartial from '@/components/partials/checkbox.partial.vue';
import type buttonPartialVue from '@/components/partials/button.partial.vue';
import type dialogPartial from '@/components/partials/dialog.partial.vue';
import type iconsPartialVue from '@/components/partials/icons.partial.vue';
import type faqModuleVue from '@/components/modules/faq.module.vue';
import type accordionPartialVue from '@/components/partials/accordion.partial.vue';
import type textblockPartialVue from '@/components/partials/textblock.partial.vue';
import type linkPartialVue from '@/components/partials/link.partial.vue';
import type videoPartialVue from '@/components/partials/video.partial.vue';
import type menuCategoryPartial from '@/components/partials/menu-category.partial.vue';
import type menuItemPartial from '@/components/partials/menu-item.partial.vue';
import type menuNavigationPartial from '@/components/partials/menu-navigation.partial.vue';
import type menuAllergensPartial from '@/components/partials/menu-allergens.partial.vue';
import type addressPartialVue from '@/components/partials/address.partial.vue';
import type agreementPartialVue from '@/components/partials/agreement.partial.vue';
import type appcomponentPartialVue from '@/components/partials/appcomponent.partial.vue';
import type buttonGroupPartialVue from '@/components/partials/button-group.partial.vue';
import type contentContainerPartialVue from '@/components/partials/content-container.partial.vue';
import type contentHeadPartialVue from '@/components/partials/content-head.partial.vue';
import type factPartialVue from '@/components/partials/fact.partial.vue';
import type fieldsetPartialVue from '@/components/partials/fieldset.partial.vue';
import type highlightPartialVue from '@/components/partials/highlight.partial.vue';
import type indicatorPartialVue from '@/components/partials/indicator.partial.vue';
import type inputLabelsPartialVue from '@/components/partials/input-labels.partial.vue';
import type inputPartialVue from '@/components/partials/input.partial.vue';
import type legendPartialVue from '@/components/partials/legend.partial.vue';
import type linkGroupPartialVue from '@/components/partials/link-group.partial.vue';
import type listPartialVue from '@/components/partials/list.partial.vue';
import type mediadetectionPartialVue from '@/components/partials/mediadetection.partial.vue';
import type picturePartialVue from '@/components/partials/picture.partial.vue';
import type quotePartialVue from '@/components/partials/quote.partial.vue';
import type selectPartialVue from '@/components/partials/select.partial.vue';
import type selectCategoryPartialVue from '@/components/partials/select-category.partial.vue';
import type textareaPartialVue from '@/components/partials/textarea.partial.vue';
import type blogIntroModuleVue from '@/components/modules/blog-intro.module.vue';
import type compareModuleVue from '@/components/modules/compare.module.vue';
import type contentModuleVue from '@/components/modules/content.module.vue';
import type actionNoticePartialVue from '@/components/partials/action-notice.partial.vue';
import type singleEventPartialVue from '@/components/partials/single-event.partial.vue'

declare module 'vue' {
    export interface GlobalComponents {
        RouterLink: typeof import('vue-router')['RouterLink']
        RouterView: typeof import('vue-router')['RouterView']
        'lila-accordion-partial': typeof accordionPartialVue
        'lila-action-notice-partial': typeof actionNoticePartialVue
        'lila-address-partial': typeof addressPartialVue
        'lila-agreement-partial': typeof agreementPartialVue
        'lila-appcomponent-partial': typeof appcomponentPartialVue
        'lila-button-group-partial': typeof buttonGroupPartialVue
        'lila-button-partial': typeof buttonPartialVue
        'lila-checkbox-partial': typeof checkboxPartial
        'lila-content-container-partial': typeof contentContainerPartialVue
        'lila-content-head-partial': typeof contentHeadPartialVue
        'lila-dialog-partial': typeof dialogPartial
        'lila-eventgroup-partial': typeof eventsPartialVue
        'lila-fact-partial': typeof factPartialVue
        'lila-fieldset-partial': typeof fieldsetPartialVue
        'lila-highlight-partial': typeof highlightPartialVue
        'lila-icons-partial': typeof iconsPartialVue
        'lila-indicator-partial': typeof indicatorPartialVue
        'lila-input-labels-partial': typeof inputLabelsPartialVue
        'lila-input-partial': typeof inputPartialVue
        'lila-legend-partial': typeof legendPartialVue
        'lila-link-group-partial': typeof linkGroupPartialVue
        'lila-link-partial': typeof linkPartialVue
        'lila-list-partial': typeof listPartialVue
        'lila-mediadetection-partial': typeof mediadetectionPartialVue
        'lila-menu-allergens-partial': typeof menuAllergensPartial
        'lila-menu-category-partial': typeof menuCategoryPartial
        'lila-menu-item-partial': typeof menuItemPartial
        'lila-menu-navigation-partial': typeof menuNavigationPartial
        'lila-overlay-background-partial': typeof overlayBackgroundPartialVue
        'lila-picture-partial': typeof picturePartialVue
        'lila-quote-partial': typeof quotePartialVue
        'lila-select-category-partial': typeof selectCategoryPartialVue
        'lila-select-partial': typeof selectPartialVue
        'lila-textarea-partial': typeof textareaPartialVue
        'lila-textblock-partial': typeof textblockPartialVue
        'lila-video-partial': typeof videoPartialVue
        'lila-blog-intro-module': typeof blogIntroModuleVue
        'lila-contact-module': typeof contactModuleVue
        'lila-compare-module':typeof compareModuleVue
        'lila-content-module': typeof contentModuleVue
        'lila-cookies-module': typeof cookiesModuleVue
        'lila-emotion-module': typeof emotionModuleVue
        'lila-event-group-module': typeof eventGrouplModuleVue
        'lila-facts-module': typeof factsModuleVue
        'lila-faq-module': typeof faqModuleVue
        'lila-footer-module': typeof footerModuleVue
        'lila-gallery-module': typeof galleryModuleVue
        'lila-index-module': typeof indexModuleVue
        'lila-menu-module': typeof menuModuleVue
        'lila-navigation-module': typeof navigationModuleVue
        'lila-partial-module': typeof partialModuleVue
        'lila-picture-module': typeof pictureModuleVue
        'lila-pictureandtext-module': typeof pictureandtextModuleVue
        'lila-picturegroup-module': typeof picturegroupModuleVue
        'lila-prices-module': typeof pricesModuleVue
        'lila-quote-module': typeof quoteModuleVue
        'lila-single-event-module': typeof singleEventPartialVue
        'lila-text-module': typeof textModuleVue
        'lila-timeline-module': typeof timelineModuleVue
        'lila-training-module': typeof trainingModuleVue
        'lila-video-module': typeof videoModuleVue  
        
    }
}

export { }