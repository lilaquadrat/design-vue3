<script setup lang="ts">
import type { ModuleGeneric } from '@lilaquadrat/interfaces';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';

defineOptions({ inheritAttrs: false });

defineProps<ModuleBaseProps & {
  modules: ModuleGeneric[];
}>();

</script>
<template>
  <section v-if="modules" ref="element" class="lila-partial-container lila-module">
    <component
      :is="single.type"
      v-for="(single, i) in modules"
      :key="`module-${i}`"
      :class="single.classes"
      v-bind="single"
    />
  </section>
</template>
<style lang="less" scoped>
.lila-partial-container {
  display: grid;
}
</style>
