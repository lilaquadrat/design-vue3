<script setup lang="ts">
import { computed } from 'vue';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';
import type { Content } from '@lilaquadrat/studio/lib/interfaces';
import dayjs from 'dayjs';
import useMainStore from '@/stores/main.store';
import { useRoute } from 'vue-router';

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
import quellcode from './viewData/quellcode';
import video from './viewData/video';
import navigation from './viewData/navigation';
import contact from './viewData/contact'

const modules: Record<string, Partial<Content>> = {
  emotion,
  facts,
  footer,
  cookies,
  faq,
  footer,
  gallery,
  index,
  picture,
  pictureandtext,
  picturegroup,
  quote,
  text,
  compare,
  prices,
  quellcode,
  video,
  navigation,
  'blog-intro': blogIntro,
  contact
};
const route = useRoute();
const store = useMainStore();
const baseContent: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode: 'presentation'
  },
  state  : 'publish',
  modules: [
    {
      type    : 'text-module',
      headline: 'Available Modules',
      links   : {
        title: 'content sites',
        value: Object.keys(modules).sort((a, b) => a.localeCompare(b)).map((single) => ({
          link: single,
          text: single
        }))
      }
    },
  ],
}

store.setConfiguration({preloadImages: true})

const contentMerged = computed(() => {

  const content = modules[route.params.pathMatch[0] as keyof typeof modules];

  if(!content) return prepareContent(baseContent);
  return prepareContent(content);

}); 

</script>

<template>
    <article class="content-screen screen">
        <lila-content-module v-if="contentMerged" :content="contentMerged" />
    </article>
</template>