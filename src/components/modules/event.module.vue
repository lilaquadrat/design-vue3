<script setup lang="ts">
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { useInview } from '@/plugins/inview';
import useMainStore from '@/stores/main.store';
import type { BasicData, Content, GenericData, GenericDataDistributed, List, ListContent, ListParticipants } from '@lilaquadrat/interfaces';
import StudioSDK from '@lilaquadrat/sdk';
import { distributeGenericData, generateDataWithContent, hardCopy, prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import { onBeforeMount, ref } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  genericData: GenericDataDistributed
}>();
const list = ref<BasicData<List>>();
const state = ref<ListParticipants>();
const contentState = ref<keyof ListContent>('pre');
const contentMerged = ref();

onBeforeMount(init);

const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});

async function init () {

  console.log('BEFOR EMOUNT EVENT', props.genericData);

  const mainStore = useMainStore();
  const sdk = new StudioSDK(mainStore.apiConfig);

  list.value = props.genericData.data[props.genericData.lists[0].toString()] as BasicData<List>;

  const stateReponse = await sdk.members.lists.state(list.value._id.toString());

  state.value = stateReponse.data;

  if(list.value?.state === 'open') {

    contentState.value = 'open';

    if(state.value) {

      if(state.value.state === 'reserved') {

        contentState.value = 'waiting';

      }

      if(state.value.state === 'confirmed') {

        contentState.value = 'active';

      }

    }

  }

  if(list.value?.state === 'closed') {

    contentState.value = 'post';

  }

  if(list.value?.content[contentState.value]) {

    const contentResponse = await sdk.members.content.getByInternalId(list.value?.content[contentState.value]);

    contentMerged.value = mergeContent(contentResponse.data);

  }

}

function mergeContent (baseContent: BasicData<Content>) {

  if(baseContent) {
  
    const safeData = hardCopy(baseContent);

    if(safeData.modules) {

      distributeGenericData(safeData.modules, generateDataWithContent(safeData.genericData as GenericData));

    }

    return prepareContent(safeData);

  }

  return prepareContent({})

} 

function handleChildEvent (event: string) {

  console.log('handle child interaction', event);

  if(event === 'reset') {

    contentMerged.value = undefined;

    init();

  }

}

</script>
<template>
  <article :id="id" ref="element" class="lila-event-module lila-module" :class="[inviewState, variant, {sub}]">

    <lila-content-module v-if="contentMerged" sub :content="contentMerged" @event="handleChildEvent" />
    
  </article>
</template>

<style lang="less" scoped>
.lila-event-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_M;

}
</style>
