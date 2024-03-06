<script setup lang="ts">
import useContentStore from '@/stores/content.store';
import useMainStore from '@/stores/main.store';
import useUserStore from '@/stores/user.store';
import type { BasicData, Content, ContentWithPositions, GenericData } from '@lilaquadrat/interfaces';
import type { SDKResponse } from '@lilaquadrat/sdk';
import { distributeGenericData, generateDataWithContent, hardCopy, prepareContent } from '@lilaquadrat/studio';
import { ref, computed, watch, onServerPrefetch, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
    type: 'footer' | 'navigation'
}>();
const store = useMainStore();
const userStore = useUserStore();
const contentStore = useContentStore(); 
const route = useRoute();
const data = ref<SDKResponse<BasicData<Content>>>();
const dataMerged = ref<ContentWithPositions>();
const loading = ref<number>(0);
const error = ref<boolean>(false);
const typeCache = ref<string>();
const contentType = computed(() => route.meta.contentType as 'public' | 'members');
const isLocked = computed(() => contentType.value == 'members' && userStore.locked?.length);

watch(route, () => getContent());
watch(() => userStore.locked, () => getContent());

onBeforeMount(async () => await getContent());
onServerPrefetch(() => getStoreContent());

function getId (contentType: 'public' | 'members', type: 'navigation' | 'footer') {
  
  return contentType !== 'public' 
    ? `m-${type}` 
    : type;

}

function getStoreContent () {

  const contentId = getId(route.meta.contentType as 'public' | 'members', props.type);
  const storeContent = contentStore.findById(contentId);

  console.log(contentId, storeContent);

  data.value = {
    data  : storeContent,
    status: 200,
  };

  loading.value = 200;

  dataMerged.value = mergeContent(data.value.data);

}

async function getContent () {
    
  getStoreContent();

  const contentId = getId(route.meta.contentType as 'public' | 'members', props.type);

  if(data.value?.data?.id === contentId) {

    return;

  }

  if(isLocked.value) {

    loading.value = 0;
    error.value = true;

    return;
  }

  if(contentType.value !== typeCache.value) {

    loading.value = 0;
    error.value = false;
    data.value = undefined;

  }

  const storeData = contentStore.findById(contentId);

  if(storeData) {

    data.value = {data: storeData, status: 200};
    loading.value = 200;
    return;

  }
    
  // get content only if there is a difference between the current and the needed content
  if (data.value?.data?.id !== contentId && loading.value === 0) {
    
    loading.value = 100;
        
    try {
        
      data.value = await store.getContent({id: contentId}, contentType.value);
      loading.value = data.value.status;

    } catch (e) {

      data.value = undefined;
      error.value = true;
      loading.value = e?.response?.status;
        
    }

    if(data.value?.status === 403 || data.value?.status === 401) {

      error.value = true;
      loading.value = data.value?.status;
      data.value = undefined;

    } 

    typeCache.value = route.meta.contentType as string;

  }

  dataMerged.value = mergeContent(data.value?.data);

}

function mergeContent (baseContent: Partial<BasicData<Content>>) {

  if(baseContent) {
  
    const safeData = hardCopy(baseContent);

    if(safeData.modules) {
      distributeGenericData(safeData.modules, generateDataWithContent(safeData.genericData as GenericData));
    }

    return prepareContent(safeData);

  }

  return undefined;

} 

</script>
<template>
    <lila-content-module v-if="dataMerged" :content="dataMerged" />
</template>