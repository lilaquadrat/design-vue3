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
const style = computed(() => {

  const cssArray = ['table-layout: fixed; width: 100%;'];

  if(props.variant?.includes('center')) {

    cssArray.push('text-align:center;')

  }

  return cssArray.join('');

});

</script>

<template>
  <table v-if="notEmpty" :id="props.index?.anchor || props.id" border="0" cellspacing="0" cellpadding="0" :style="style">
    <tbody>
      <tr v-if="headline">
        <td>
          <h1 style="text-transform: uppercase; padding: 0; margin: 0; font-weight: bold; color: #3f2d56; font-size: 34px; line-height: 36px; padding-bottom: 10px; font-family: Arial, Helvetica, sans-serif; letter-spacing: -1.5px;">
            {{ $replacer(headline) }}
          </h1>
        </td>
      </tr>
      <tr v-if="subline">
        <td>
          <h2 v-if="subline" style="padding: 0; margin: 0; color: #3f2d56; font-size: 28px;  font-weight: bold; line-height: 30px; padding-bottom: 10px; font-family: Arial, Helvetica, sans-serif; letter-spacing: -1.5px;">
            {{ $replacer(subline) }}
          </h2>
        </td>
      </tr>
      <tr v-if="intro">
        <td>
          <h3 v-if="intro" style="padding: 0; margin: 0; color: #555; font-weight: bold; font-size: 15px; padding-bottom: 10px; font-family: Arial, Helvetica, sans-serif;">
            {{ $replacer(intro) }}
          </h3>
        </td>
      </tr>
      <tr>
        <td>    
          <p v-for="(singleText, index) in text" :key="`text-${index}`" style="padding: 0; margin: 0; color: #555; font-size: 15px; padding-bottom: 5px; font-family: Arial, Helvetica, sans-serif;">
            {{ $replacer(singleText) }}
          </p>
        </td>
      </tr>
  
      <slot />
    </tbody>
  </table>
</template>