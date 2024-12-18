<script setup lang="ts">
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import useMainStore from '@/stores/main.store';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

const mainStore = useMainStore();
const props = defineProps<ModuleBaseProps & {hint: string, additionalData?: any}>();
const useModule = computed(() => {

  const modules = mainStore.target === 'browser'
    ? mainStore.customModulesBrowser 
    : mainStore.customModulesMail

  if(!props.hint || !modules?.length) return undefined;

  const module = modules?.find((single) => single.hint === props.hint);

  if(module) {

    return {
      ...module,
      module: `lila-${module.module}`
    }

  }

  return undefined;

})

</script>
<template>
    <component v-if="useModule?.module" :is="useModule.module" :hint="useModule.hint" :additionalData="additionalData" />
</template>