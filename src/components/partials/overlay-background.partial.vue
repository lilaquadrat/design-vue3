<template>
  <Teleport to="body">
    <section class="lila-overlay-background" ref="element" :class="[backgroundMode, customIndex, {hasCustomIndex, inactive}]" @keydown="checkClose" @click="checkClose">
      <slot />
    </section>
  </Teleport>
</template>
<script setup lang="ts">
import useMainStore from '@/stores/main.store';
import { onUnmounted, watch } from 'vue';
import { onMounted } from 'vue';
import { computed, ref } from 'vue';

const mainStore = useMainStore();
const props = defineProps<{
  background: 'none' | 'mobile' | 'tablet' | 'desktop'
  index?: number
  inactive?: boolean
}>();
const emit = defineEmits<{
    (e: 'mounted'): void
    (e: 'close'): void
}>();
const backgroundMode = computed(() => props.background || 'mobile');
const customIndex = computed(() => props.index ? `index${props.index}` : false);
const hasCustomIndex = computed(() => props.index);
const element = ref<HTMLElement>();

watch(() => props.inactive, () => {

  if(props.inactive) {
    mainStore.checkFullscreen();
  } else {
    mainStore.setFullscreen(true);
  }

})

onMounted(() => {

  emit('mounted');

  if(!props.inactive) mainStore.setFullscreen(true);

});

onUnmounted(() => {

  mainStore.checkFullscreen();

});

function checkClose (event: Event) {

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

  &.inactive {
    pointer-events: none;
  }

  @media @tablet, @desktop {
    background-color: transparent;
  }

  &:not(.hasCustomIndex) {
    .index(10);
  }

  &.index5 {
    .index(5);
  }
  &.index6 {
    .index(6);
  }
  &.index7 {
    .index(7);
  }
  &.index8 {
    .index(8);
  }
  &.index9 {
    .index(9);
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
