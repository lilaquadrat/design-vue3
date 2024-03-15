<script setup lang="ts">
import { computed } from 'vue';
import { prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import type { Content } from '@lilaquadrat/interfaces';
import useMainStore from '@/stores/main.store';
import { useRoute } from 'vue-router';
import { hardCopy } from '@lilaquadrat/studio';

import preview from './viewData/preview';

import emotion from './viewData/emotion';
import blogIntro from './viewData/blog-intro';
import facts from './viewData/facts';
import footer from './viewData/footer';
import cookies from './viewData/cookies';
import faq from './viewData/faq';
import gallery from './viewData/gallery';
import picture from './viewData/picture';
import picturegroup from './viewData/picturegroup';
import pictureandtext from './viewData/pictureandtext';
import quote from './viewData/quote';
import text from './viewData/text';
import index from './viewData/index';
import compare from './viewData/compare';
import prices from './viewData/prices';
// import quellcode from './viewData/quellcode';
import video from './viewData/video';
import navigation from './viewData/navigation';
import contact from './viewData/contact';
import menu from './viewData/menu';
import training from './viewData/training';
import timeline from './viewData/timeline';
import events from'./viewData/events'

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
  events
};
const route = useRoute();
const store = useMainStore();

function getBaseContent () {

  const baseContent = hardCopy(preview);
  const elements: Object[] = [];

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
  }
  );

  return baseContent;

}

store.setConfiguration({preloadImages: true})

const contentMerged = computed(() => {

  const content = modules[route.params.pathMatch as keyof typeof modules];

  if(!content) return prepareContent(getBaseContent());
  return prepareContent(content);

}); 

</script>

<template>
    <article class="content-screen screen">
        <lila-content-module v-if="contentMerged" :content="contentMerged" />
    </article>
</template>