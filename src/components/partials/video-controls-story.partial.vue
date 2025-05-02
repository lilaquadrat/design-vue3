<script setup lang="ts">
import dom from '@/functions/lila-dom';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  element: HTMLVideoElement
  muted: boolean
  playing: boolean
}>();
const emit = defineEmits<{
    (e: 'togglePlay',): void; //Argument of type '{}' is not assignable to parameter of type 'boolean'.
    (e: 'toggleSound',): void; //Argument of type '{}' is not assignable to parameter of type 'boolean'.
}>();

function playPause () {

  console.log('toggleplay')

  emit('togglePlay');

}

function mute () {

  console.log('mute', props.element.muted)

  emit('toggleSound');

}

</script>
<template>
  <section class="video-controls-story">
    <lila-button-partial class="mute" color-scheme="transparent" @click="mute">
      <lila-icons-partial color-scheme="white" size="large" :type="muted ? 'muted' : 'unmuted'" />
    </lila-button-partial>
    <lila-button-partial class="pause" color-scheme="transparent" @click="playPause">
      <lila-icons-partial color-scheme="white" size="large" :type="playing ? 'pause' : 'play'" />
    </lila-button-partial>
  </section>
</template>
<style lang="less">
.video-controls-story {

    display: grid;
    grid-template-columns: max-content max-content;

    justify-content: end;
    justify-self: center;
    gap: 10px;

    position: absolute;

    top: 20px;

    width: 95%;
    z-index: 3;
}
</style>