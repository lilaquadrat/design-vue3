<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { distributeGenericData, generateDataWithContent, hardCopy, prepareContent } from '@lilaquadrat/studio';
import type { BasicData, Content, GenericData } from '@lilaquadrat/interfaces';
import useMainStore from '@/stores/main.store';
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
import type { SDKResponse } from '@lilaquadrat/sdk';
import useUserStore from '@/stores/user.store';
import { onServerPrefetch } from 'vue';

const route = useRoute();
const mainStore = useMainStore();
const userStore = useUserStore();
const data = ref<SDKResponse<BasicData<Partial<Content>>>>();
const layout = ref<SDKResponse<BasicData<Content>> | undefined>();
const loading = ref<number>(0);
const error = ref<boolean>(false);

watch(route, () => getContent());
watch(() => userStore.locked, () => getContent());
onBeforeMount(() => getContent());
onServerPrefetch(() => getStoreContent());

const contentType = computed(() => route.meta.contentType as 'public' | 'members');
const isLocked = computed(() => contentType.value == 'members' && userStore.locked?.length);
const hint = computed(() => {

  if(loading.value === 404) {
    return 'error-404'
  }

  if(isLocked.value) {

    return `error-${userStore.locked}-${contentType.value}`;

  }

  return undefined;

});

function getContentId (contentType: 'public' | 'members', pathMatch?: string) {

  const name = pathMatch ? pathMatch : 'home';

  return contentType !== 'public' ? `${contentType}-${name}` : name;
  
}

async function getStoreContent () {

  const storeContent = mainStore.data;

  data.value = {
    status: 200,
    data  : storeContent,
  };

  loading.value = 200;

}

async function getContent () {

  loading.value = 0;
  error.value = false;

  if(isLocked.value) {

    error.value = true;
    loading.value = 403;
    return;

  } 

  const contentId = getContentId(contentType.value, route.params.pathMatch as string);

  data.value = await mainStore.getContent({id: contentId}, contentType.value);

  const status = data.value.status;

  if(status === 200) {

    error.value = false;

    if(data.value.data.settings.useLayout) {

      layout.value = await mainStore.getContent({internalId: data.value.data.settings.useLayout.toString()}, contentType.value);
      loading.value = 200;

    } else {

      layout.value = undefined;
      loading.value = 200;

    }

  } else if (status === 403 || status === 401 || status === 400) {

    error.value = true;
    loading.value = status;

  } else if (status === 204 || status === 404) {

    error.value = true;
    loading.value = 404;

  } 

}

const contentMerged = computed(() => {

  if(loading.value === 200 && data.value) {

    const safeData = hardCopy(data.value?.data);

    distributeGenericData(safeData.modules, generateDataWithContent(safeData.genericData as GenericData));
    return prepareContent(safeData, layout.value?.data);

  }

  return prepareContent({})

}); 

</script>

<template>
    <article class="content-screen screen">
        <lila-error-partial v-if="error" :status="loading" :hint="hint" :type="contentType" />
        <lila-content-module v-if="contentMerged" :content="contentMerged" />
    </article>
</template>