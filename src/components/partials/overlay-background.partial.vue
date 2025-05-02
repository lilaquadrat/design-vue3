<template>
  <Teleport to="body">
    <section ref="element" class="lila-overlay-background" :class="[backgroundMode, customIndex, {hasCustomIndex, inactive}]" @keydown="animationAwareClose" @click="animationAwareClose">
      <template v-if="transition">
        <transition name="fade" @after-leave="closeAfterTransition">
          <slot v-if="showContent" />
        </transition>
      </template>

      <template v-if="!transition">
        <slot />
      </template>
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
  /**
   * if transition is true the slot will be called in transition and enables a animation
   * to close the overlay from the outside in a way that the animation is played out correctly
   * you need to use the exposed animationAwareClose
   * ```TS
   const overlay = ref<OverlayBackgroundExposure>();
   
   function close () {

      return overlay.value?.animationAwareClose();

   }
   ```
   */
  transition?: boolean
}>();
const emit = defineEmits<{
    (e: 'mounted'): void
    (e: 'close'): void
}>();
const backgroundMode = computed(() => props.background || 'mobile');
const customIndex = computed(() => props.index ? `index${props.index}` : false);
const hasCustomIndex = computed(() => props.index);
const element = ref<HTMLElement>();
const showContent = ref<boolean>(false);

watch(() => props.inactive, () => {

  if(props.inactive) {
    mainStore.checkFullscreen();
  } else {
    mainStore.setFullscreen(true);
  }

})

onMounted(() => {

  emit('mounted');
  showContent.value = true;

  if(!props.inactive) mainStore.setFullscreen(true);

});

onUnmounted(() => {

  mainStore.checkFullscreen();

});

function closeAfterTransition () {

  emit('close');

}

function animationAwareClose (event?: Event) {

  if(event) {

    if (element.value !== event.target) return;

  }

  if(props.transition) {

    showContent.value = false;

  } else {
    
    emit('close');

  }

}

defineExpose({
  animationAwareClose
});
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
