<script setup lang="ts">
import useMainStore from '@/stores/main.store';
import type { BasicData, Content } from '@lilaquadrat/interfaces';
import type { SDKResponse } from '@lilaquadrat/sdk';
import { prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import { watch } from 'vue';
import { onBeforeMount } from 'vue';
import { ref, computed } from 'vue';

const props = defineProps<{
    status: number
    type?: 'member' | 'public' | 'restricted'
    hint?: string
}>();
const store = useMainStore();
const data = ref<SDKResponse<BasicData<Content>>>();

watch(props, () => getContent());

function getContentId () {

  if(props.hint) return props.hint;

  const nameArray: string[] = ['error', props.status.toString()];

  if(props.type) nameArray.push(props.type);

  return nameArray.join('-');

}

async function getContent () {

  data.value = await store.getContent({id: getContentId()}, 'public');

}

onBeforeMount(async () => await getContent());

const useData = computed(() => {

  if(data?.value?.data?.modules) return data.value?.data;

  if(store.staticData) {

    if(props.hint) {
  
      return store.staticData[props.hint];
  
    }
  
    if(props.status > 0) {
  
      return store.staticData[props.status];
  
    }

  }

  return undefined;

});
const contentMerged = computed(() => {

  if(useData.value) return prepareContent(useData.value);
  return prepareContent({})

}); 

</script>
<template>
    <lila-content-module v-if="contentMerged" :content="contentMerged" />
</template>