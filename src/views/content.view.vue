<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { distributeGenericData, generateDataWithContent, hardCopy, prepareContent } from '@lilaquadrat/studio';
import type { BasicData, Content, ContentWithPositions, GenericData } from '@lilaquadrat/interfaces';
import useMainStore from '@/stores/main.store';
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
import type { SDKResponse } from '@lilaquadrat/sdk';
import useUserStore from '@/stores/user.store';
import { onServerPrefetch } from 'vue';
import useContentStore from '@/stores/content.store';
import { HelpersPlugin } from '@/plugins/filters';

const route = useRoute();
const userStore = useUserStore();
const mainStore = useMainStore();
const contentStore = useContentStore();
const dataMerged = ref<ContentWithPositions>();
const layout = ref<SDKResponse<BasicData<Content>> | undefined>();
const loading = ref<number>(0);
const error = ref<boolean>(false);

watch(route, async () => await getContent());
watch(() => userStore.locked, () => getContent());
onBeforeMount(async () => await getContent());
onServerPrefetch(() => getStoreContent(HelpersPlugin.getFilename(contentType.value, route.path)));

const linkMode = computed(() => {

  if(mainStore.config?.dynamic === false) return 'link';

  return undefined

});
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

function getStoreContent (filename: string) {

  const storeContent = mainStore.data;
  const storeLayout = mainStore.layout;

  console.log('storeContent', storeContent, filename);
  
  if(!storeContent) return false;

  /**
  *  if the current data matches the required filename or the target is mail, because emails dont have filenames
  *  we can use the store data
  */
  if(storeContent && storeContent.settings?.filename?.includes(filename) || storeContent.target === 'mail') {
    
    dataMerged.value = mergeContent(storeContent, storeLayout);
    loading.value = 200;
    error.value = false;

    updateContext();
    return true;

  } else {

    dataMerged.value = undefined;
    return false;

  }

}

function updateContext () {

  contentStore.setContext({
    sitetitle  : mainStore.data?.settings?.title,
    description: mainStore.data?.settings?.description,
  })

}

async function getContent () {

  if(isLocked.value) {

    error.value = true;
    loading.value = 403;
    return;

  } 

  const filename = HelpersPlugin.getFilename(contentType.value, route.path);

  /**
  * while hydration we need to check if the store has the content
  * to avoid fetching it again from the server
  */

  if(getStoreContent(filename)) return;

  // if(data.value?.data?.settings?.filename?.includes(filename)) return;

  loading.value = 0;
  error.value = false;
    
  const content: SDKResponse<BasicData<Content>> = await mainStore.getContent({filename}, contentType.value) as SDKResponse<BasicData<Content>>;

  mainStore.data = content.data;
  loading.value = content.status;
  updateContext();

  if(loading.value === 200) {

    error.value = false;

    if(mainStore.config?.dynamic) {

      layout.value = await mainStore.getContent({id: `${contentType.value}-layout`}, contentType.value) as SDKResponse<BasicData<Content>>;
      mainStore.layout = layout.value.data;

    } else {

      if(mainStore.data?.settings?.useLayout) {
  
        layout.value = await mainStore.getContent({internalId: mainStore.data.settings.useLayout.toString()}, contentType.value) as SDKResponse<BasicData<Content>>;
        mainStore.layout = layout.value.data;
  
      } else {
  
        mainStore.layout = undefined;
        layout.value = undefined;
  
      }

    }

  } 

  if ([400, 401, 403].includes(loading.value)) {

    error.value = true;

  } else if ([204, 404].includes(loading.value) || !loading.value) {

    error.value = true;
    loading.value = 404;

  }

  if(mainStore.data) {

    dataMerged.value = mergeContent(mainStore.data, mainStore.layout);

  } else {

    dataMerged.value = undefined;

  }

}

function mergeContent (baseContent: Partial<BasicData<Content>>, layout?: Content) {

  if(baseContent) {
    
    const safeData = hardCopy(baseContent);

    if(safeData.modules) {

      distributeGenericData(safeData.modules, generateDataWithContent(safeData.genericData as GenericData));

    }

    return prepareContent(safeData, layout);

  }

  return prepareContent({})

} 

</script>

<template>
    <article class="content-screen screen">
        <lila-error-partial v-if="error" :status="loading" :hint="hint" :type="contentType" />
        <lila-content-module v-if="dataMerged" :linkMode="linkMode" :content="dataMerged" />
    </article>
</template>