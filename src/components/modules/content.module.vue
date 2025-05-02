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

function handleEvents (event: string) {

  emit('event', event);

}

</script>

<template>
  <section v-if="content" class="lila-content-module" :class="{sub}">
    <article v-if="!!content.top.length" class="top container" :class="{inline, sub}">
      <component :is="`${single.type}`" v-for="single in content.top" :key="single.uuid" :class="[single.classes, {sub}]" v-bind="single" :additional="content.additional" position="top" @event="handleEvents($event)" />
    </article>

    <article v-if="!!content.content.length" class="container" :class="[mode, {inline, sub}]" :inline="inline">
      <template v-for="single in content.content" :key="single.uuid">
        <component :is="`${single.type}`" :class="[single.classes, {sub}]" v-bind="single" :parent-id="content.id" :sub="sub" :additional="content.additional" position="content" @event="handleEvents($event)" />
      </template>
    </article>

    <article v-if="!!content.bottom.length" class="bottom container" :class="{inline, sub}">
      <component :is="`${single.type}`" v-for="single in content.bottom" :key="single.uuid" :class="[single.classes, {sub}]" v-bind="single" :additional="content.additional" position="bottom" @event="handleEvents($event)" />
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