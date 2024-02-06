<template>
  <section ref="element" :class="[variant, inviewState]" class="lila-module lila-quellcode-module">
    <lila-textblock-partial v-bind="props.textblock" />
    <lila-highlight-partial :code="props.code" :variant="props.variant" />
  </section>
</template>
<script setup lang="ts">
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import type Textblock from '@/interfaces/textblock.interface';
import { useInview } from '@/plugins/inview';
import { ref } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  textblock?: Textblock
  code: string;
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});

</script>

<style lang="less" scoped>

.lila-quellcode-module {
  .module;
  .modulePadding('none');

  display: grid;
  gap: 40px;
  justify-items: center;
  max-width: @desktopWidthExt;

  .lila-textblock {
    .modulePadding();
    max-width: @desktopWidth;

    &.center {
      text-align: center;
    }

  }

}
</style>
