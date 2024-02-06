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

  data.value = await store.getContent({id: getContentId()});

}

onBeforeMount(async () => await getContent());

const contentMerged = computed(() => {

  if(data.value) return prepareContent(data.value?.data);
  return prepareContent({})

}); 

</script>
<template>
    <lila-content-module v-if="contentMerged" :content="contentMerged" />
</template>