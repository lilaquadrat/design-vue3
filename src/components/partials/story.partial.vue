<script setup lang="ts">
import type Link from '@/interfaces/link.interface';
import type Textblock from '@/interfaces/textblock.interface';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  media: any;
  textblock: Textblock
  active: boolean
  variant?: string[]
  link?: Link
  animation?: string
  parentVisible?: boolean
}>();
const emit = defineEmits<{
  (e: 'progress', i: number): void;
}>();
const video = ref();

watch(() => props.active, handleActive);
watch(() => video.value, handleActive);
watch(() => props.parentVisible, visibilityChanged);
onMounted(() => handleActive)

function handleActive () {

  if(!props.parentVisible) return;

  if(video.value && props.active) {

    video.value.callAutoPlay();

  }

  if(video.value && !props.active) {

    video.value.pause();

  }

}

function updateProgress (progress: number) {

  if(props.active) {

    emit('progress', progress)

  }

}

function restart () {

  if(video.value) {

    video.value.restart();

  }

}

function visibilityChanged (visible: boolean) {

  if(video.value && props.active) {

    if(visible) {

      video.value.callAutoPlay();
      
    } else {
      
      video.value.pause();
      
    }

  }
}

defineExpose({
  restart,
  visibilityChanged
})

</script>
<template>
  <section class="lila-story" :class="[variant, media.type, {active}]">
    <lila-video-partial v-if="media && media.type === 'video'" ref="video" v-bind="media" custom-controls="lila-video-controls-story-partial" fit @progress="updateProgress" />
    <lila-picture-partial v-if="media && media.type === 'image'" v-bind="media" :active-animation="active" :animation="animation" fit />
    
    <section class="position-container">
      <lila-textblock-partial v-bind="textblock" :variant="['bright']" />
    </section>

    <lila-action-partial v-if="link" v-bind="link" call-to-action />
  </section>
</template>
<style lang="less" scoped>

.lila-story {
    display: grid;
    visibility: hidden;

    background-color: @color1;
    
    &.active {
        visibility: visible;
    }

    .position-container {
        display: grid;
        position: absolute;
        width: 100%;
        height: 100%;
        .multi(padding, 16, 8, 16, 8);

        background-color: rgba(0, 0, 0, .4);
        align-items: start;
    }

    &.video {
        .position-container {
            background-color: transparent;
        }
    }

    &.textVerticalCenter {
        .position-container {
            align-items: center;
        }
    }

    &.textVerticalEnd {
        .position-container {
            align-items: end;
        }
    }

    :deep(.lila-link), :deep(.lila-button) {
        position: absolute;
        justify-self: center;
        bottom: 20px;
        z-index: 6;
    }

    .lila-video-partial {
        z-index: 5;
    }
}
</style>
