<script setup lang="ts">
import type Link from '@/interfaces/link.interface';
import { computed, type ComputedRef } from 'vue';

const props = withDefaults(defineProps<{
  value?: (string | Link)[]
  title?: string
  mode?: 'list' | 'links'
  variant?: string[]
}>(), {mode: 'list'})
const isNumbered: ComputedRef<boolean> = computed(() => !!props.variant?.includes('numbered')); 
const noStyle: ComputedRef<boolean> = computed(() => !!props.variant?.includes('noStyle')); 
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

  <section class="lila-list-links" v-if="notEmpty" :class="variant">
    <h4 style="padding: 0; margin: 0; color: #555; font-weight: bold; font-size: 15px; padding-bottom: 20px; font-family: Arial, Helvetica, sans-serif;" v-if="title">{{ $replacer(title) }}</h4>

    <ul v-if="!actions || mode === 'list'" style="padding: 0; margin: 0; padding-left: 20px;">
      <li v-for="(single, index) in filteredValues" :key="`list-element-${index}`" style="padding: 0; margin: 0; list-style-type: circle; list-style-position: inside; color: #555; font-size: 15px; padding-bottom: 5px; font-family: Arial, Helvetica, sans-serif;">

        <lila-link-partial v-if="typeof(single) === 'object'" v-bind="single" />
        <template v-if="typeof(single) === 'string'">{{ $replacer(single) }}</template>

      </li>
    </ul>

    <lila-link-group-partial :variant="variant" v-if="actions">

      <template v-for="(single, index) in filteredValues" >
        <lila-link-partial v-if="typeof(single) === 'object'" v-bind="single" :key="`list-actions-element-${index}`" />
      </template>

    </lila-link-group-partial>

  </section>

</template>