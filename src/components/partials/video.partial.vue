<script setup lang="ts">
import { useResize } from '@/plugins/resize';
import type { VideoSource } from '../../interfaces/video.interface';
import { computed, nextTick, onMounted, ref, watch, type WatchStopHandle } from 'vue';
import dom from '@/functions/lila-dom';
import { useYoutube } from '@/plugins/youtube';
import { onBeforeMount } from 'vue';
import type Video from '@/interfaces/video.interface';

const props = withDefaults(
  defineProps<Video & {
    trigger?: boolean
    poster?: string
    attributes?: string[]
    source?: VideoSource[]
    preview?: boolean
    preload?: 'auto' | 'metadata' | 'none'
    fit?: boolean
    customControls?: string
    /**
     * when the video has the state "canplay" it get muted und start playing
     * this way it can be properly unmuted and does not use html attributes
     */
    autoplay?: boolean
  }>(),
  {
    preload: 'auto',
  },
);
const emit = defineEmits<{
  (e: 'playing', i: boolean): void;
  (e: 'loading', i: boolean): void;
  (e: 'progress', i: number): void;
  (e: 'metadata', i: {duration: number}): void;
}>();
const { media } = useResize();
const { youtubeApiState, addYoutube } = useYoutube();
const videoElement = ref<HTMLVideoElement>();
const youtubePlayerElement = ref<HTMLElement>();
const youtubePlayer = ref<YT.Player>();
const loading = ref<boolean>(true);
const loadVideo = ref<boolean>(false);
const isPlaying = ref<boolean>(false);
const isMuted = ref<boolean>(false);
const renderTarget = ref<string>('browser');
const state = ref<string>('init');
const alreadyStarted = ref<boolean>(false);
const progress = ref<number>(0);
const listenersAttached = ref<boolean>(false);
const autoplayWatcher = ref<WatchStopHandle>();
const videoType = computed(() => (props.src?.match('^https://(www.)?youtube.com') ? 'youtube' : 'basic'));
const renderVideo = computed(() => (props.preload === 'auto' || (props.preload === 'none' && loadVideo.value)) && props.src && videoType.value !== 'youtube' && renderTarget.value !== 'pdf');
const youtubeId = computed(() => {

  if (videoType.value !== 'youtube') return false;

  const url = new URL(props.src);

  console.log('get youtube id');

  return url.searchParams.get('v');

});

watch(() => media.value, () => start());
watch(() => props.src, () => start());
watch(() => props.source, () => start());
watch(() => props.trigger, () => toggle());
watch(() => isPlaying.value, () => emit('playing', isPlaying.value));
watch(() => state.value, () => emit('loading', state.value === 'loading'));
/**
 * this is needed for recreating the youtube player after changing the src
 */
watch(() => youtubePlayerElement.value, () => {

  if(youtubeId.value && videoType.value === 'youtube' && youtubePlayerElement.value) start();

});
/**
* used if preload is set to none to start the video after the element is loaded
*/
watch(() => videoElement.value, () => {

  //if the watcher is called in the init process we wont force start playing
  start(state.value !== 'init');
  bind();

});

const attributesObject = computed(() => {

  const newObject: Record<string, string> = {};

  props.attributes?.forEach((single: string) => {

    newObject[single] = single;

  });

  return newObject;

});

onBeforeMount(() => {

  if (props.preload === 'auto') loadVideo.value = true;

})

onMounted(() => {

  start();
  bind();

});

/**
 * adds listeners for play, pause and ended events
 */
function bind () {

  if (listenersAttached.value || !loadVideo.value) return;

  if (videoType.value === 'basic' && videoElement.value) {

    dom.onElement('playing', videoElement.value, () => {

      console.log('playing');

      isPlaying.value = true;

    });

    dom.onElement('pause', videoElement.value, () => {

      isPlaying.value = false;

    });

    dom.onElement('ended', videoElement.value, () => {

      isPlaying.value = false;

    });

    dom.onElement('canplay', videoElement.value, () => {

      isPlaying.value = false;
      state.value = 'ready';

      if(videoElement.value && props.autoplay) {
        
        toggleSound(true);
        videoElement.value?.play();

      }

    });

    dom.onElement('timeupdate', videoElement.value, updateProgress);
    dom.onElement('seeked', videoElement.value, updateProgress);
    dom.onElement('loadedmetadata', videoElement.value, () => {

      emit('metadata', {duration: videoElement.value?.duration as number});
      updateProgress;
      
    });
    
    listenersAttached.value = true;

  }

  if (videoType.value === 'youtube' && youtubePlayer.value) {

    youtubePlayer.value?.addEventListener('onStateChange', (event: YT.OnStateChangeEvent) => {

      if (event.data === 1) isPlaying.value = true;
      if (event.data === 2 || event.data === 0) isPlaying.value = false;

    })

    listenersAttached.value = true;

  }

}

/**
 * starts or pauses the video
 *
 * if preload is set to none, inits the loading 
 */
function toggle () {

  /**
  * video was not preloaded and is not loaded
  */
  if (props.preload === 'none' && !loadVideo.value) {

    loadVideo.value = true;
    state.value = 'loading';
    if (videoType.value === 'youtube') startYoutube();
    return false;

  }

  if (props.preview) return false;

  if (isPlaying.value) {

    pause();

  } else {

    play();

  }

}

/**
 * trigger the loading of the youtube api and create the player when its done
 */
function startYoutube () {

  if (!youtubeApiState.value) {

    addYoutube();
    watch(youtubeApiState, () => createYoutubePlayer());

  } else {

    createYoutubePlayer()

  }

  return

}

async function start (forcePlaying?: boolean) {

  console.log('start', loadVideo.value, videoElement.value, videoType.value);

  if (!loadVideo.value) return false;

  if (videoType.value === 'youtube') {

    startYoutube();
    return;

  }

  await nextTick();
  if (!videoElement.value) return;

  const current = videoElement.value.querySelector('source[src]');
  const allSource = videoElement.value.querySelectorAll('source');
  let newSource = videoElement.value.querySelector(`.${media.value}`);

  if (allSource.length === 1 || !newSource) newSource = allSource[0];

  console.log(allSource, newSource);

  if (current) current.removeAttribute('src');
  if (newSource) newSource.setAttribute('src', newSource.getAttribute('data-src') as string);

  await nextTick();
  if (typeof videoElement.value.load !== 'function') return;

  console.log('start #1', newSource);

  if (props.attributes?.includes('muted')) {

    videoElement.value.volume = 0;
    videoElement.value.muted = true;

  }

  /** play the video when its ready to play */
  videoElement.value.addEventListener('canplay', () => {

    if (props.attributes?.includes('play') || forcePlaying || isPlaying.value) {

      play();

    }

  },
  { once: true }
  );

  videoElement.value.load();
}

function play () {

  if (youtubePlayer.value) {

    youtubePlayer.value.playVideo();

  } else {

    videoElement.value?.play();

    if (props.attributes?.includes('unmuted')) {

      if (videoElement.value) videoElement.value.muted = false;

    }
  }

}

function pause () {

  if (youtubePlayer.value) {

    youtubePlayer.value.pauseVideo();

  } else {

    videoElement.value?.pause();
  }

  /**
  * if pause is called after callAutoPlay we need to stop the watcher
  * if not the video would play when it shouldnt
  */
  if(autoplayWatcher.value) {

    autoplayWatcher.value();

  }

}

function restart () {

  if(!videoElement.value) return;
  videoElement.value.currentTime = 0;  
}

function callAutoPlay () {

  autoplayWatcher.value = watch(state, () => {

    if(state.value === 'ready') {

      if(!alreadyStarted.value) toggleSound(true);
      videoElement.value?.play();
      
      if(autoplayWatcher.value) autoplayWatcher.value();
    }
    
  })
  
  if(state.value === 'ready') {
    
    if(!alreadyStarted.value) toggleSound(true);
    videoElement.value?.play();

  }
  
}

function toggleSound (mute?: boolean) {

  if(videoElement.value) {

    if(typeof mute === 'undefined') {

      videoElement.value.muted = !videoElement.value.muted;
      isMuted.value = videoElement.value.muted;
    
    } else {

      videoElement.value.muted = mute;
      isMuted.value = mute;

    }

  }

}

function updateProgress () {

  if(!videoElement.value) return;

  alreadyStarted.value = true;

  const percentPlayed = Math.round(videoElement.value.currentTime / videoElement.value.duration * 100);

  progress.value = percentPlayed;

  emit('progress', percentPlayed);

}

/**
 * create the youtube player
 */
function createYoutubePlayer () {

  console.log('try to create player', youtubePlayerElement.value, youtubeId.value);

  if (!youtubePlayerElement.value || !youtubeId.value) return;

  const playerVars: YT.PlayerVars = {
    loop    : props.attributes?.includes('loop') ? 1 : 0,
    autoplay: props.attributes?.includes('autoplay') ? 1 : 0,
    mute    : props.attributes?.includes('mute') ? 1 : 0,
    controls: props.attributes?.includes('controls') ? 1 : 0,
    rel     : 0,
    showinfo: 0

  }

  console.log('create new youtube video', youtubeId.value, youtubePlayer.value);

  youtubePlayer.value = new YT.Player(
    youtubePlayerElement.value,
    {
      height : '100%',
      width  : '100%',
      videoId: youtubeId.value,
      playerVars,
      events : {
        onReady: () => {

          console.log('onready');

          bind();
          state.value = 'ready';
          if (props.preload === 'none') play();

        },
      }
    }
  );

  bind();

}

const filteredSource = computed(() => props.source?.filter((single) => !!single.source));

defineExpose({
  pause,
  play,
  restart,
  toggleSound,
  callAutoPlay
})

</script>
<template>
  <section @click="toggle" @keyup="toggle" class="lila-video-partial" :class="[{ noPreload: preload === 'none', fit }, state]">
    
    <section v-if="preload === 'none' && state !== 'ready' && videoType !== 'youtube'" class="preload-placeholder">
    </section>
    
    <video v-if="renderVideo" v-bind="attributesObject" ref="videoElement" :preload="preload" :poster="poster" :class="[state, { loading: loading }]" :key="src">
      <source v-for="single in filteredSource" :key="single.media" :class="single.media" :data-src="single.source" />
      <track kind="captions" />
      <source v-if="src" :data-src="src" />
    </video>

    <component v-if="customControls && videoElement" :is="customControls" :element="videoElement" :muted="isMuted" :playing="isPlaying" @togglePlay="toggle" @toggleSound="toggleSound"/>
    
    <section v-if="youtubeId" class="youtube-container">
      <div ref="youtubePlayerElement" class="youtube-video"></div>
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

  .youtube-container,
  .preload-placeholder {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    /* Aspect Ratio 16:9 */
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

  &.fit {
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &.noPreload {
    video {
      position: absolute;
    }

    &.ready {
      video {
        position: relative; 
      }
    }
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
