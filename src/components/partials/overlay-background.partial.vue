<template>
    <section class="lila-overlay-background" ref="element" :class="[backgroundMode]" @keydown="checkClose" @click="checkClose">
      <slot />
    </section>
</template>
<script setup lang="ts">
import { computed, nextTick, onDeactivated, onMounted, ref } from 'vue';

const props = defineProps < {
  background: 'none' | 'mobile' | 'tablet' | 'desktop';
}> ();
const emit = defineEmits<{
    (e: string): void
}>();
const backgroundMode = computed(() => props.background || 'mobile');
const element = ref<HTMLElement>();

function checkClose (event: Event) {

  console.log(event);

  if (element.value !== event.target) return;

  emit('close');

}

// onMounted(() => {

//   nextTick(() => {

//     if (this.$store) this.$store.dispatch('fullscreen', true);
//     emit('mounted');

//   });

// });

// onDeactivated(() => {

//   if (this.$store) this.$store.dispatch('fullscreen', false);

// });
// not sure sbout this.$store
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
  .index(10);

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
