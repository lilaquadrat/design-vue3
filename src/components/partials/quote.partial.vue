<template>
  <figure class="lila-quote">
    <blockquote :class="[variant, textSize]" v-if="notEmpty">
      "{{ quote }}"
    </blockquote>
    <figcaption ref='figcaption' :class="variant">
      <span v-if="citation || linkExists">{{ citation }}</span><span v-if="citation && linkExists">,</span>
      <cite v-if="linkExists">
        <lila-link-partial v-bind="link"></lila-link-partial>
      </cite>

    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import type Link from '@interfaces/link.interface';

import { computed, nextTick, watch, onMounted, ref } from 'vue';

const props = defineProps<{
  quote: string;
  link?: Link;
  citation?: string;
  variant?: string[]
}>();
const textSize = ref<string>('headline_XS');

watch(props, () => setTextSize());

const notEmpty = computed(() => !!props.quote);

function setTextSize (): void {

  nextTick().then(() => {

    if (props.quote?.length && props.variant?.includes('small')) {

      if (props.quote?.length <= 20) textSize.value = 'headline_XL';
 
      else if (props.quote?.length <= 65) textSize.value = 'headline_L';

      else if (props.quote?.length <= 125) textSize.value = 'headline_M';

      else if (props.quote?.length <= 170) textSize.value = 'headline_S';

    } else if (props.quote?.length) {

      if (props.quote?.length <= 45) textSize.value = 'headline_XL';

      else if (props.quote?.length <= 100) textSize.value = 'headline_L';

      else if (props.quote?.length <= 150) textSize.value = 'headline_M';

      else if (props.quote?.length <= 390) textSize.value = 'headline_S';

      else textSize.value = 'headline_XS';

    }

  });

}

onMounted(() => setTextSize());

const linkExists = computed(() => props.link?.text && props.link?.link);

</script>
<style lang="less" scoped>

.lila-quote {

  display: grid;
  gap: 15px;

  blockquote {
    .font-head;
    color: @color1;

    &.headline_XL {
      font-size: @headline_XL;
      line-height: @headlineLineHeight_XL;

      @media @smartphone {
        font-size: @headline_L;
        line-height: @headlineLineHeight_XL;
      }
    }

    &.headline_L {
      font-size: @headline_L;
      line-height: @headlineLineHeight_XL;
    }

    &.headline_M {
      font-size: @headline_M;
      line-height: @headlineLineHeight_L;
    }

    &.headline_S {
      font-size: @headline_S;
      line-height: @headlineLineHeight_M;
    }

    &.headline_XS {
      font-size: @headline_XS;
      line-height: @headlineLineHeight_S;
    }

    &.quoteRight {
      text-align: right;
    }

    &.quoteCenter {
      text-align: center;
    }

  }

  figcaption {

    font-size: @fontTextSmaller;

    &.captionCenter {
      text-align: center;
    }

    &.captionRight {
      text-align: right;
    }
  }

}
</style>
