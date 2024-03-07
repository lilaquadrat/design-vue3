<script setup lang="ts">
import useMainStore from '@/stores/main.store';
import useUserStore from '@/stores/user.store';
import { prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import { computed, onBeforeMount, onMounted, onServerPrefetch, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userStore = useUserStore();
const mainStore = useMainStore();
const someRef = ref();
const computedVar = computed(() => mainStore.data);
const computedVar1 = computed(() => prepareContent(mainStore.data));
const contentVar = ref();

watch(route, async () => await getContent());
watch(() => userStore.locked, () => getContent());

onBeforeMount(() => {
  someRef.value = {test: 1};
  getContent();
})
onServerPrefetch(() => {
  someRef.value = {test: 1};
  getStoreContent();
})

function getStoreContent () {

  const storeContent = mainStore.data;

  contentVar.value = {
    data  : storeContent,
    status: 200,
  };

}

async function getContent () {

  await mainStore.getContent({id: 'test'}, 'public');
  contentVar.value = 2;

}

</script>
<template>
    <article>
        <div v-if="computedVar">is computed {{ computedVar }}</div>
        <div v-if="someRef">is someRef {{ someRef }}</div>
        this is seom {{ computedVar1 }}
        {{ contentVar }}
    </article>
</template>