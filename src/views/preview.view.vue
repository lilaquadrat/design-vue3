<script setup lang="ts">
import { computed } from 'vue';
import { prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import type { Content } from '@lilaquadrat/interfaces';
import useMainStore from '@/stores/main.store';
import { useRoute } from 'vue-router';
import { hardCopy } from '@lilaquadrat/studio';

import preview from './viewData/preview';

import blogIntro from './viewData/blog-intro';
import compare from './viewData/compare';
import contact from './viewData/contact';
import cookies from './viewData/cookies';
import eventslist from './viewData/eventslist';
import faq from './viewData/faq';
import facts from './viewData/facts';
import footer from './viewData/footer';
import gallery from './viewData/gallery';
import index from './viewData/index';
import navigation from './viewData/navigation';
import picture from './viewData/picture';
import pictureandtext from './viewData/pictureandtext';
import picturegroup from './viewData/picturegroup';
import prices from './viewData/prices';
import quote from './viewData/quote';
import text from './viewData/text';
import timeline from './viewData/timeline';
import training from './viewData/training';
import video from './viewData/video';
import emotion from './viewData/emotion';
import menu from './viewData/menu';
import event from './viewData/event';
import story from './viewData/story';
import location from './viewData/location'
import partialsPreview from './viewData/partials-preview';
import datepicker from './viewData/datepicker';
import shoppingCart from './viewData/shopping-cart';
import type Textblock from '@/interfaces/textblock.interface';

const modules: Record<string, Partial<Content>> = {
  emotion,
  facts,
  footer,
  cookies,
  faq,
  gallery,
  index,
  picture,
  pictureandtext,
  picturegroup,
  quote,
  text,
  compare,
  prices,
  // quellcode,
  video,
  navigation,
  'blog-intro': blogIntro,
  contact,
  menu,
  training,
  timeline,
  eventslist,
  event,
  story, 
  shoppingCart,
  location
};
const partials: Record<string, {settings?: {title?: string, description?: string}, partials: {textblock?: Textblock, props: Record<string, unknown>}[]}> = {
  datepicker
}
const route = useRoute();
const store = useMainStore();

function getBaseContent () {

  const baseContent = hardCopy(preview);
  const elements: Object[] = [];
  const partialsElements: Object[] = [];

  Object.keys(modules).sort((a, b) => a.localeCompare(b)).forEach((single) => {

    const singleModule = modules[single];

    elements.push({
      link: {
        link: `/${single}`
      },
      textblock: {
        headline: singleModule.settings?.title || single,
        intro   : singleModule.settings?.description
      }
    })

  });

  Object.keys(partials).sort((a, b) => a.localeCompare(b)).forEach((single) => {

    partialsElements.push({
      link: {
        link: `/partials/${single}`
      },
      textblock: {
        headline: single,
      }
    })

  });

  baseContent.modules.push({
    uuid   : '9a081157-eaf8-419d-a534-244ad69d3012',
    type   : 'picturegroup-module',
    variant: [
      'fourColumns',
      'cards'
    ],
    elements: elements,

    textblock: {
      headline: 'Explore the Modules'
    }
  });

  baseContent.modules.push({
    uuid   : '9a081157-eaf8-419d-a534-244ad69d3013',
    type   : 'picturegroup-module',
    variant: [
      'fourColumns',
      'cards'
    ],
    elements: partialsElements,

    textblock: {
      headline: 'Explore the Partials'
    }
  });

  return baseContent;

}

store.setConfiguration({ preloadImages: true })

const contentMerged = computed(() => {

  let content: Partial<Content>;

  if(route.params.pathMatch?.includes('partials')) {

    const partialName = route.params.pathMatch[1];
    const partialData = partials[partialName];

    content = hardCopy(partialsPreview);
    content.modules?.push({
      type    : 'text-module',
      headline: partialData.settings?.title,
      subline : partialData.settings?.description,
      variant : []
    });

    content.modules?.push({
      type       : 'partials-preview-module',
      partial    : partialName,
      partialData: partialData.partials,
    });

  } else {

    content = modules[route.params.pathMatch as keyof typeof modules];
    
  }

  if (!content) return prepareContent(getBaseContent());
  return prepareContent(content);

});

</script>

<template>
  <article class="content-screen screen">
    <lila-content-module v-if="contentMerged" :content="contentMerged" />
  </article>
</template>