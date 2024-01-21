<template>
    <section class="lila-overlay-background" ref="element" :class="[backgroundMode, customIndex, {hasCustomIndex}]" @keydown="checkClose" @click="checkClose">
      <slot />
    </section>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps < {
  background: 'none' | 'mobile' | 'tablet' | 'desktop';
  index?: number
}> ();
const emit = defineEmits<{
    (e: string): void
}>();
const backgroundMode = computed(() => props.background || 'mobile');
const customIndex = computed(() => props.index ? `index${props.index}` : false);
const hasCustomIndex = computed(() => props.index);
const element = ref<HTMLElement>();

function checkClose (event: Event) {

  console.log(event);

  if (element.value !== event.target) return;

  emit('close');

}

</script>
<style lang="less" scoped>

.lila-overlay-background {
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, .5);

  @media @tablet, @desktop {
    background-color: transparent;
  }

  &:not(.hasCustomIndex) {
    .index(10);
  }

  &.index5 {
    .index(5);
  }


  &.mobile {
    background-color: rgba(0, 0, 0, .5);

    @media @tablet, @desktop {
      background-color: rgba(0, 0, 0, .5);
    }
  }

  &.none {
    background-color: transparent;

    @media @tablet, @desktop {
      background-color: transparent;
    }
  }

  &.tablet {

    @media @tablet {
      background-color: rgba(0, 0, 0, .5);
    }
  }

  &.desktop {

    @media @tablet, @desktop {
      background-color: rgba(0, 0, 0, .5);
    }
  }

  .content-container {
    .index(11);
    position: absolute;
  }

}
</style>
