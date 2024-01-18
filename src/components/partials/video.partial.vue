<script setup lang="ts">
import { useResize } from '@/plugins/resize';
import type { VideoSource } from '../../interfaces/video.interface';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import dom from '@/functions/lila-dom';
import { useYoutube } from '@/plugins/youtube';

const props = withDefaults(
  defineProps<{
    trigger: boolean;
    poster?: string;
    src: string;
    attributes?: string[];
    source?: VideoSource[];
    js?: boolean;
    preview?: boolean;
    preload?: 'auto' | 'metadata' | 'none';
  }>(),
  {
    preload: 'auto',
  },
);
const {youtubeApiState, addYoutube } = useYoutube();
const videoElement = ref<HTMLVideoElement>();
const youtubePlayer = ref();
const loading = ref<boolean>(true);
const loadVideo = ref<boolean>();
const isPlaying = ref<boolean>(false);
const renderTarget = ref<string>('browser');
const state = ref<string>('loading');
const videoType = computed(() => (props.src?.match('^https://(www.)?youtube.com') ? 'youtube' : 'basic'));
const youtubeId = computed(() => {

  if (videoType.value !== 'youtube') return false;

  const url = new URL(props.src);
  
  console.log(url, url.searchParams.get('v'));

  return url.searchParams.get('v');

});
const emit = defineEmits<{
  (e: string, i: boolean): void;
}>();
const { media } = useResize();


watch(() => props.src, () => start());
watch(() => props.source, () => start());
watch(() => props.trigger, () => toggle());

const attributesObject = computed(() => {

  const newObject: Record<string, string> = {};

  props.attributes?.forEach((single) => {

    newObject[single] = single;

  });

  return newObject;

});

watch(() => isPlaying.value, () => emit('playing', isPlaying.value));

onMounted(() => {
  start();
  bind();
});

function bind () {

  if (videoElement.value) {

    dom.onElement('playing', videoElement.value, () => {

      isPlaying.value = true;

    });

    dom.onElement('pause', videoElement.value, () => {

      isPlaying.value = false;

    });

    dom.onElement('ended', videoElement.value, () => {

      isPlaying.value = false;

    });

  }

}

function toggle () {
  // if (props.preload === 'none' && !loadVideo.value) {
  //   loadVideo.value = true;
  //   nextTick(() => {
  //     bind();
  //     start();
  //   });
  //   return false;
  // }

  if (props.preview) return false;

  if (videoType.value === 'basic') {

    if (!videoElement.value) return false;

    if (isPlaying.value) {

      videoElement.value.pause();

    } else {

      if (props.attributes?.includes('unmuted')) {

        videoElement.value.muted = false;
        
      }

      play();

    }

  }

  // if (videoType.value === 'youtube') {
  //   if (isPlaying.value) {
  //     youtubeObject.pause();
  //   } else {
  //     youtubeObject.playVideo();
  //   }
  // }

}


async function start (this: any) {

  if (videoType.value === 'youtube') {
  
    if(!youtubeApiState.value) {

      addYoutube();
      watch(youtubeApiState, () => createYoutubePlayer());


    } else {

      createYoutubePlayer()
    }

    return
  }

  console.log(videoElement.value, props.src);

  await nextTick();
  if(!videoElement.value) return;

  const current = videoElement.value.querySelector('source[src]');
  const allSource = videoElement.value.querySelectorAll('source');
  let newSource = videoElement.value.querySelector(`.${media.value}`);

  if (allSource.length === 1) newSource = allSource[0];

  if (current) current.removeAttribute('src');
  if (newSource) newSource.setAttribute('src', newSource.getAttribute('data-src') as string);

  await nextTick();
  if (typeof videoElement.value.load !== 'function') return;

  videoElement.value.load();

  if (props.attributes?.includes('muted')) {

    videoElement.value.volume = 0;
    videoElement.value.muted = true;

  }

  if (props.attributes?.includes('play')) {

    play();

  }

}

function play () {

  videoElement.value.play();
  isPlaying.value = true;
  
}


function createYoutubePlayer () {
  new YT.Player(youtubePlayer.value, {
    height : '100%',
    width  : '100%',
    videoId: youtubeId.value,
    // Additional player parameters
  });
}
// const youtubeSettings = computed(() => {
//   if (videoType.value !== 'youtube') return false;
//   return {
//     'video-id'     : youtubeId,
//     'player-width' : '100%',
//     'player-height': '100%',
//     'player-vars'  : {
//       autoplay      : props.attributes?.includes('autoplay') ? 1 : 0,
//       controls      : props.attributes?.includes('controls') ? 1 : 0,
//       loop          : props.attributes?.includes('loop') ? 1 : 0,
//       modestbranding: 1,
//       rel           : 0,
//     },
//     host: 'https://www.youtube-nocookie.com',
//   };
// });
// const realSrc = computed(() => {
//   if (videoType.value === 'youtube') {
//     const url = new URL(props.src);
//     const videoId = url.searchParams.get('v');

//     return props.js ? videoId : `https://www.youtube-nocookie.com/embed/${videoId}`;
//   }

//   return props.src;
// });

// function ready (event: { target: any }) {
//   youtubeObject = event.target;
// }


function paused () {
  isPlaying.value = false;
  emit('playing', false);
}

function ended () {
  isPlaying.value = false;
  emit('ended', false);
}
</script>
<template>
  <section @click="toggle" @keyup="toggle" class="lila-video-partial" :class="{ noPreload: preload === 'none' }">
    <section v-if="preload === 'none' && !loadVideo" class="preload-placeholder">LOAD VIDEO</section>
    <video v-if="(preload === 'auto' || (preload === 'none' && loadVideo)) && src && !youtubeId && renderTarget !== 'pdf'" v-bind="attributesObject" ref="videoElement" :preload="preload" :poster="poster" :class="[state, { loading: loading }]" :key="src">
      <source v-for="single in source" :key="single.media" :class="single.media" :data-src="single.source" />
      <track kind="captions" />
      <source v-if="src" :data-src="src" />
    </video>
    <section v-if="youtubeId" class="youtube-container">
      <div ref="youtubePlayer" class="youtube-video">YOUTUBE {{ youtubeApiState }}</div>
    </section>
  </section>
</template>
<style lang="less" scoped>
.lila-video-partial {
  display: grid;
  max-width: 100%;

  &:hover {
    cursor: pointer;
  }

  .youtube-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* Aspect Ratio 16:9 */
    overflow: hidden;
  }

  :deep(.youtube-video) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  video,
  .preload-placeholder {
    display: grid;
    max-width: 100%;
  }

  .preload-placeholder {
    align-content: center;
    justify-content: center;
    min-height: 100px;
    background-color: @grey1;
    color: @color1;
    .font-head;
  }

  .iframe {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    height: auto;
    padding: 56.25% 0 0 0;

    iframe {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
