<script setup lang="ts">
import type IconsPartial from '@/interfaces/IconsPartial';
import { computed } from 'vue';

const props = defineProps<{
  link: string
  text?: string
  icon?: IconsPartial['type']
  attributes?: string[]
  classes?: string[]
  variant?: string[]
  callToAction?: boolean
  button?: boolean
  [key: string]: any,
}>();
const linkStyle = computed(() => {

  if(props.variant?.includes('callToAction')) {

    return 'background-color: #3f2d56; text-transform: uppercase; font-weight: 800; color: white; padding: 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; font-family: Arial, Helvetica, sans-serif;'

  }

  return 'text-decoration: none; color: #3f2d56;';

});

</script>
<template>
  <a v-if="link" :style="linkStyle" :href="$replacer(link)">
    {{ $replacer(text) }}
  </a>
</template>