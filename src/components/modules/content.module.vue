<script setup lang="ts">
import type { ChildData, ContentWithPositions } from '@lilaquadrat/interfaces';
import { computed, provide } from 'vue';

const props = defineProps<{
  content?: ContentWithPositions
  inline?: boolean
  sub?: boolean
  routeBase?: string
  linkEvents?: boolean
  linkBase?: string
  linkMode?: string
  contentChildData?: ChildData
}>();
const emit = defineEmits<{
    (e: 'event', data: string): void;
}>();

provide('linkMode', props.linkMode);
provide('linkBase', props.linkBase);

const mode = computed(() => props.content?.settings.mode || 'presentation');

function handleEvents (event: string, data?: unknown) {

  console.log('handleEvent', event);
  emit('event', event);

}

</script>

<template>
  <section class="lila-content-module" v-if="content" :class="{sub}">

    <article class="top container" :class="{inline, sub}"  v-if="!!content.top.length">
      <component v-for="single in content.top" :class="[single.classes, {sub}]" :is="`${single.type}`" :key="single.uuid" v-bind="single" :additional="content.additional" position="top" @event="handleEvents($event)" />
    </article>

    <article class="container" :class="[mode, {inline, sub}]" :inline="inline" v-if="!!content.content.length">
      <template v-for="single in content.content" :key="single.uuid">
        <component :class="[single.classes, {sub}]" :is="`${single.type}`" v-bind="single" :sub="sub" :additional="content.additional" position="content" @event="handleEvents($event)" />
      </template>
    </article>

    <article class="bottom container" :class="{inline, sub}" v-if="!!content.bottom.length">
      <component v-for="single in content.bottom" :class="[single.classes, {sub}]" :is="`${single.type}`" :key="single.uuid" v-bind="single" :additional="content.additional" position="bottom" @event="handleEvents($event)" />
    </article>

  </section>
</template>

<style lang="less" scoped>
.lila-content-module {
  position: relative;

  max-width: 100%;

  .container {
    display: grid;

    grid-template-columns: 100%;

    align-items: center;
    max-width: 100%;
    .multi(margin-bottom, 4);

    .lila-module {

      &:first-child {

        .multi(margin-top, 16);

        &.fullscreen {
          .multi(margin-top, 0);
        }
      }
    }

    &.top, &.inline, &.sub {
      .multi(margin-bottom, 0);

      .lila-module {

        &:first-child {
          .multi(margin-top, 0);
        }
      }
    }

    &.presentation {
      gap: @rowGapPresentation;
    }

    &.content {
      gap: @rowGapContent;
    }
  }

}
</style>