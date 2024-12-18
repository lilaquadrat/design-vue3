<script setup lang="ts">
import type LinkListWithTitle from '@/interfaces/LinkListWithTitle.interface';
import type ListWithTitle from '@/interfaces/ListWithTitle.interface';
import type Textblock from '@/interfaces/textblock.interface';
import { computed } from 'vue';

const props = defineProps<Textblock & {
  links?: LinkListWithTitle
  list?: ListWithTitle
  variant?: string[],
  id?: string
}>();
const notEmpty = computed(() => !!(props.headline?.length || props.subline?.length || props.intro?.length || props.text?.length)); 

</script>

<template >
  <section :id="id" :class="[variant]" v-if="notEmpty" class="lila-textblock">
    <h1 v-if="headline">{{ $replacer(headline) }}</h1>
    <h2 v-if="subline">{{ $replacer(subline) }}</h2>
    <h3 v-if="intro">{{ $replacer(intro) }}</h3>
    <p v-for="(singleText, index) in text" :key="`text-${index}`">
      {{ $replacer(singleText) }}
    </p>

    <slot></slot>
  </section>
</template>

<style lang="less" scoped>

.lila-textblock {
  display: grid;
  gap: 15px;
  width: 100%;
  word-break: break-word;
  grid-template-rows: max-content;

  &:not(.content) {
    .headlines;
  }

  &.content {
    .headlines-content;
  }

  p {
    .font-normal;
    color: @textColor;
    font-size: @fontText;
  }

  h1, h2, h3, h4, h5 {
    .trans(color);
  }

  h2 + h3 {
    .multi(margin-top, 2);
  }

  &.bright {

    h1, h2, h3, h4, h5, p {
      color: @white;
    }
  }

  &:empty {
    display: none;
  }
}

.lila-link, .lila-button {
  &:hover {
    .lila-textblock {
      h1, h2, h3, h4, h5 {
        color: @color2;
      }
    }
  }
}
</style>