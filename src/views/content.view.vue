<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import type { BasicData, Content } from '@lilaquadrat/interfaces';
import useMainStore from '@/stores/main.store';
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
import type { SDKResponse } from '@lilaquadrat/sdk';

const route = useRoute();
const store = useMainStore();
const data = ref<SDKResponse<BasicData<Content>>>();
const layout = ref<SDKResponse<BasicData<Content>> | undefined>();
const loading = ref<number>(0);
const error = ref<boolean>(false);

watch(route, () => getContent());
onBeforeMount(() => getContent());

const contentType = computed(() => route.meta.contentType as 'public' | 'member');

function getContentId (contentType: 'public' | 'member', pathMatch?: string) {

  const name = pathMatch ? pathMatch : 'home';

  return `${contentType}-${name}`;
  
}

async function getContent () {

  loading.value = 0;
  error.value = false;

  const contentId = getContentId(contentType.value, route.params.pathMatch as string);

  data.value = await store.getContent({id: contentId});

  if(data.value.status === 200) {

    error.value = false;

    if(data.value.data.settings.useLayout) {

      layout.value = await store.getContent({internalId: data.value.data.settings.useLayout.toString()});
      loading.value = 200;

    } else {

      layout.value = undefined;
      loading.value = 200;

    }

  } else if (data.value.status === 403 || data.value.status === 401) {

    error.value = true;
    loading.value = data.value.status;

  } else if (data.value.status === 204 || data.value.status === 404) {

    error.value = true;
    loading.value = 404;

  } 

}

const contentMerged = computed(() => {

  if(loading.value === 200 && data.value) return prepareContent(data.value?.data, layout.value?.data);
  return prepareContent({})

}); 

</script>

<template>
    <article class="content-screen screen">
    {{ error }} {{ loading }}
        <lila-error-partial v-if="error" :status="loading" :hint="loading === 404 ? 'error404' : undefined" :type="contentType" />
        <lila-content-module v-if="contentMerged" :content="contentMerged" />
    </article>
</template>