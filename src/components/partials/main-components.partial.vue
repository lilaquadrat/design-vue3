<script setup lang="ts">
import useMainStore from '@/stores/main.store';
import type { BasicData, Content } from '@lilaquadrat/interfaces';
import type { SDKResponse } from '@lilaquadrat/sdk';
import { prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
    type: 'footer' | 'navigation'
}>();
const store = useMainStore();
const route = useRoute();
const data = ref<SDKResponse<BasicData<Content>>>();
const loading = ref<number>(0);
const error = ref<boolean>(false);
const typeCache = ref<string>();

watch(route, () => getContent());

onMounted(() => {

  getContent();

});

function getId (contentType: string, type: 'navigation' | 'footer') {
  
  return `${contentType}-${type}`;

}

async function getContent () {
    
  const contentId = getId(route.meta.contentType as string, props.type);

  if(route.meta.contentType !== typeCache.value) {

    loading.value = 0;
    error.value = false;
    data.value = undefined;

  }
    
  // get content only if there is a difference between the current and the needed content
  if (data.value?.data?.id !== contentId && loading.value === 0) {
    
    loading.value = 100;
        
    try {
        
      data.value = await store.getContent({id: contentId});
      loading.value = data.value.status;

    } catch (e) {

      data.value = undefined;
      error.value = true;
      loading.value = e.response.status;
        
    }

    if(data.value?.status === 403 || data.value?.status === 401) {

      error.value = true;
      loading.value = data.value?.status;
      data.value = undefined;

    } 

    typeCache.value = route.meta.contentType as string;

  }

}

const contentMerged = computed(() => {

  if(data.value && loading.value === 200) return prepareContent(data.value?.data);
  return prepareContent({})

}); 

</script>
<template>
    <lila-content-module v-if="contentMerged" :content="contentMerged" />
</template>