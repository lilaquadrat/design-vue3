<script setup lang="ts">
import type Picture from '@interfaces/picture.interface';
import Textblock from '@interfaces/textblock.interface';
import Video from '@interfaces/video.interface';
import { defineProps, ref, watch } from 'vue';
import { computed } from 'vue';

const props = defineProps<{
  poster: Picture;
  textblock: Textblock;
  video: Video;
  js: boolean;
}>()({
  clickEvent: ref(false),
  playing: ref(false),
  started: ref(false),
  hasPoster: computed(() => !!props.poster?.src),
  controls: computed(() => props.video?.attributes?.includes('controls')),
  
  trigger() {
    this.clickEvent.value = !this.clickEvent.value;
  },

  toggle(event: boolean) {
    this.started.value = true;
    this.playing.value = event;
  },

  ended() {
    this.started.value = false;
  },

  checkInview() {
    // implementation for checkInview method
  },

  mounted() {
    this.checkInview();
    watch(() => props.video, () => this.checkInview());
  }
});
</script>

<template>
<section :id="id" @click="trigger" @keypress="trigger"
:class="[variant, view, {started, controls}]" class="lila-video-module lila-module">

    <section class="video-container">

    <lila-video-partial :trigger="clickEvent" v-bind="video" @playing="toggle" @ended="ended" />

    <section class="position-container" :class="{visible: !playing}">
        <lila-textblock-partial v-if="textblock" v-bind="textblock" :variant="variant" />
    </section>

    <lila-picture-partial class="posterExt" v-if="hasPoster" :class="{visible: !playing}" v-bind="poster" />

    </section>

</section>
</template>
  
