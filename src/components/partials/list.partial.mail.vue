<script setup lang="ts">
import type Link from '@/interfaces/link.interface';
import { computed, type ComputedRef } from 'vue';

const props = withDefaults(defineProps<{
  value?: (string | Link)[]
  title?: string
  mode?: 'list' | 'links'
  variant?: string[]
}>(), {mode: 'list'})
const listStyle = computed(() => {

  const cssArray = ['padding: 0; margin: 0; color: #555; font-size: 15px; padding-bottom: 5px; font-family: Arial, Helvetica, sans-serif;'];

  if(props.variant?.includes('noStyle')) {

    cssArray.push('list-style-type: none;');

  } else {

    cssArray.push('list-style-position: inside; list-style-type: circle;')

  }

  if(props.variant?.includes('center')) {

    cssArray.push('text-align: center;');

  }

  return cssArray.join(' ');

}); 
const actions: ComputedRef<boolean> = computed(() => !!props.variant?.includes('actions')); 
const notEmpty: ComputedRef<boolean> = computed(() => !!props.value?.find((single) => {

  if (typeof single === 'string') return single.length > 0;
  return single.text?.length > 0;

})); 
const filteredValues: ComputedRef<(string | Link)[]|undefined> = computed(() => props.value?.filter((single) => {

  if (typeof single === 'string' && single.length) return single;
  if (typeof single === 'object' && single.text && single.link) return single;
  return false;

})); 

</script>

<template>
  <section v-if="notEmpty" class="lila-list-links" :class="variant">
    <h4 v-if="title" style="padding: 0; margin: 0; color: #555; font-weight: bold; font-size: 15px; padding-bottom: 20px; font-family: Arial, Helvetica, sans-serif;">
      {{ $replacer(title) }}
    </h4>

    <ul v-if="!actions || mode === 'list'" style="padding: 0; margin: 0;">
      <li v-for="(single, index) in filteredValues" :key="`list-element-${index}`" :style="listStyle">
        <lila-link-partial v-if="typeof(single) === 'object'" v-bind="single" />
        <template v-if="typeof(single) === 'string'">
          {{ $replacer(single) }}
        </template>
      </li>
    </ul>

    <lila-link-group-partial v-if="actions" :variant="variant">
      <template v-for="(single, index) in filteredValues">
        <lila-link-partial v-if="typeof(single) === 'object'" v-bind="single" :key="`list-actions-element-${index}`" />
      </template>
    </lila-link-group-partial>
  </section>
</template>