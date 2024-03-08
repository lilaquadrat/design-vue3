<script setup lang="ts">
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import useMainStore from '@/stores/main.store';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

const {customModules} = useMainStore();
const props = defineProps<ModuleBaseProps & {hint: string, hintData: any}>();
const useModule = computed(() => {

  if(!props.hint || !customModules?.length) return undefined;

  const module = customModules?.find((single) => single.hint === props.hint);

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
    <component v-if="useModule?.module" :is="useModule.module" :hint="useModule.hint" :hintData="useModule.hintData" />
</template>