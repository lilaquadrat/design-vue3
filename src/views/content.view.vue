<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { distributeGenericData, generateDataWithContent, hardCopy, prepareContent } from '@lilaquadrat/studio';
import type { BasicData, Content, GenericData } from '@lilaquadrat/interfaces';
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

const contentType = computed(() => route.meta.contentType as 'public' | 'members');

function getContentId (contentType: 'public' | 'members', pathMatch?: string) {

  const name = pathMatch ? pathMatch : 'home';

  return `${contentType}-${name}`;
  
}

async function getContent () {

  loading.value = 0;
  error.value = false;

  const contentId = getContentId(contentType.value, route.params.pathMatch as string);

  data.value = await store.getContent({id: contentId}, contentType.value);

  if(data.value.status === 200) {

    error.value = false;

    if(data.value.data.settings.useLayout) {

      layout.value = await store.getContent({internalId: data.value.data.settings.useLayout.toString()}, contentType.value);
      loading.value = 200;

    } else {

      layout.value = undefined;
      loading.value = 200;

    }

  } else if (data.value.status === 403 || data.value.status === 401 || data.value.status === 400) {

    error.value = true;
    loading.value = data.value.status;

  } else if (data.value.status === 204 || data.value.status === 404) {

    error.value = true;
    loading.value = 404;

  } 

}

const contentMerged = computed(() => {

  if(loading.value === 200 && data.value) {

    const safeData = hardCopy(data.value?.data);
  
    distributeGenericData(safeData.modules, generateDataWithContent(safeData.genericData as GenericData));

    console.log(safeData);
  
    return prepareContent(safeData, layout.value?.data);
  }

  return prepareContent({})

}); 

</script>

<template>
    <article class="content-screen screen">
        <lila-error-partial v-if="error" :status="loading" :hint="loading === 404 ? 'error404' : undefined" :type="contentType" />
        <lila-content-module v-if="contentMerged" :content="contentMerged" />
    </article>
</template>