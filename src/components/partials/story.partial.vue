<script setup lang="ts">
import type Link from '@/interfaces/link.interface';
import type Textblock from '@/interfaces/textblock.interface';

defineProps<{
  media: any;
  textblock: Textblock
  active: boolean
  variant?: string[]
  link?: Link
}>();

</script>
<template>
  <section class="lila-story" :class="[variant, {active}]">
    <lila-video-partial v-if="media && media.type === 'video'" v-bind="media" />
    <lila-picture-partial v-if="media && media.type === 'image'" v-bind="media" :activeAnimation="active" fit />
    <section class="position-container">
        <lila-textblock-partial v-bind="textblock" :variant="['bright']" />
    </section>
    <lila-link-partial v-if="link" v-bind="link" callToAction />
  </section>
</template>
<style lang="less" scoped>

.lila-story {
    display: grid;

    .position-container {
        display: grid;
        position: absolute;
        width: 100%;
        height: 100%;
        .multi(padding, 16, 8, 16, 8);

        background-color: rgba(0, 0, 0, .4);
        align-items: start;
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

    .lila-link {
        position: absolute;
        justify-self: center;
        bottom: 20px;
    }
}
</style>
