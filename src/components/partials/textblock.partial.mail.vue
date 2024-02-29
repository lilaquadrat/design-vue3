<script setup lang="ts">
import type LinkListWithTitle from '@/interfaces/LinkListWithTitle.interface';
import type ListWithTitle from '@/interfaces/ListWithTitle.interface';
import { computed, type ComputedRef } from 'vue';

const props = defineProps<{
  headline?: string
  subline?: string
  intro?: string
  text?: string[]
  links?: LinkListWithTitle
  list?: ListWithTitle
  variant?: string[],
  id?: string
}>();
const notEmpty: ComputedRef<boolean> = computed(() => !!(props.headline || props.subline || props.intro || props.text)); 

</script>

<template >
  <table :id="id" :class="[variant]" v-if="notEmpty">
    <tr v-if="headline">
      <td><h1 style="text-transform: uppercase;  font-weight: bold; color: #3f2d56; font-size: 28px; line-height: 30px; padding-bottom: 10px; font-family: Arial, Helvetica, sans-serif; letter-spacing: -1.5px;">{{ $replacer(headline) }}</h1></td>
    </tr>
    <tr v-if="subline">
      <td><h2 style="color: #3f2d56; font-size: 28px;  font-weight: bold; line-height: 30px; padding-bottom: 10px; font-family: Arial, Helvetica, sans-serif; letter-spacing: -1.5px;" v-if="subline">{{ $replacer(subline) }}</h2></td>
    </tr>
    <tr v-if="intro">
      <td><h3 style="color: #555; font-weight: bold; font-size: 15px; padding-bottom: 10px; font-family: Arial, Helvetica, sans-serif;" v-if="intro">{{ $replacer(intro) }}</h3></td>
    </tr>
    <tr>
      <td>    
        <p style="color: #555; font-size: 15px; padding-bottom: 5px; font-family: Arial, Helvetica, sans-serif;" v-for="(singleText, index) in text" :key="`text-${index}`">
          {{ $replacer(singleText) }}
        </p>
      </td>
    </tr>

    <slot></slot>
  </table>
</template>

<!-- <style lang="less" scoped>
.lila-textblock {
  display: grid;
  gap: 15px;
  width: 100%;
  word-break: break-word;
  grid-template-rows: max-content;

  .headlines;

  p {
    .font-normal;
    color: @textColor;
    font-size: @fontText;
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
</style> -->