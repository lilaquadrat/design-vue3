<script setup lang="ts">
import type { ModuleGeneric } from '@lilaquadrat/interfaces';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';

defineOptions({ inheritAttrs: false });

defineProps<ModuleBaseProps & {
  modules: ModuleGeneric[];
}>();

</script>
<template>
  <section  ref="element" class="lila-partial-container lila-module" v-if="modules">

    <component v-for="(single, i) in modules" :class="single.classes" :is="single.type" v-bind:key="`module-${i}`"
      v-bind="single"></component>

  </section>
</template>
<style lang="less" scoped>
.lila-partial-container {
  display: grid;
}
</style>
