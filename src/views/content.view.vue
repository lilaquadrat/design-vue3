<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { distributeGenericData, generateDataWithContent, hardCopy, prepareContent } from '@lilaquadrat/studio';
import type { BasicData, Content, ContentWithPositions, GenericData, HttpStatusCode } from '@lilaquadrat/interfaces';
import useMainStore from '@/stores/main.store';
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
import type { SDKResponse } from '@lilaquadrat/sdk';
import useUserStore from '@/stores/user.store';
import { onServerPrefetch } from 'vue';
import useContentStore from '@/stores/content.store';
import { HelpersPlugin } from '@/plugins/filters';
import type { AxiosError } from 'node_modules/axios/index.cjs';

const route = useRoute();
const userStore = useUserStore();
const mainStore = useMainStore();
const contentStore = useContentStore();
const data = ref<SDKResponse<BasicData<Partial<Content>> | undefined>>();
const dataMerged = ref<ContentWithPositions>();
const layout = ref<SDKResponse<BasicData<Content>> | undefined>();
const loading = ref<number>(0);
const error = ref<boolean>(false);

watch(route, async () => await getContent());
watch(() => userStore.locked, () => getContent());
onBeforeMount(async () => await getContent());
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

function getStoreContent () {

  const storeContent = mainStore.data;
  
  if(!storeContent) return;
  
  data.value = {
    data  : storeContent,
    status: 200,
  };
  
  loading.value = 200;
  
  updateContext();

  if(data.value.data) {

    dataMerged.value = mergeContent(data.value.data);

  } else {

    dataMerged.value = undefined;

  }

}

function updateContext () {

  contentStore.setContext({
    sitetitle  : mainStore.data?.settings?.title,
    description: mainStore.data?.settings?.description,
  })

}

async function getContent () {

  getStoreContent();

  const filename = HelpersPlugin.getFilename(contentType.value, route.path);

  if(data.value?.data?.settings?.filename?.includes(filename)) return;

  let content: SDKResponse<BasicData<Content>>;

  loading.value = 0;
  error.value = false;

  if(isLocked.value) {

    error.value = true;
    loading.value = 403;
    return;

  }

  try {
    
    content = await mainStore.getContent({filename}, contentType.value) as SDKResponse<BasicData<Content>>;
    data.value = content;
  
  } catch (error) {

    const typedError = error as AxiosError;

    data.value = {data: undefined, status: typedError.response?.status as HttpStatusCode}
    
  } 

  loading.value = 200;

  if(data.value.status === 200) {

    error.value = false;

    if(data.value?.data?.settings?.useLayout) {

      layout.value = await mainStore.getContent({internalId: data.value.data.settings.useLayout.toString()}, contentType.value) as SDKResponse<BasicData<Content>>;
      loading.value = 200;

    } else {

      layout.value = undefined;
      loading.value = 200;

    }

  } 

  if ([400, 401, 403].includes(data.value.status)) {

    error.value = true;
    loading.value = data.value.status;

  } else if ([204, 404].includes(data.value.status) || !data.value.status) {

    error.value = true;
    loading.value = 404;

  }

  if(data.value.data) {

    dataMerged.value = mergeContent(data.value.data);

  } else {

    dataMerged.value = undefined;

  }

}

function mergeContent (baseContent: Partial<BasicData<Content>>) {

  if(baseContent) {
    
    const safeData = hardCopy(baseContent);

    if(safeData.modules) {

      distributeGenericData(safeData.modules, generateDataWithContent(safeData.genericData as GenericData));

    }

    return prepareContent(safeData);

  }

  return prepareContent({})

} 

</script>

<template>
    <article class="content-screen screen">
        <lila-error-partial v-if="error" :status="loading" :hint="hint" :type="contentType" />
        <lila-content-module v-if="dataMerged" :content="dataMerged" />
    </article>
</template>