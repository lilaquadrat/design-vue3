<script setup lang="ts">
import type IconsPartial from '@/interfaces/IconsPartial';

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

</script>
<template>
  <a v-if="link" style="text-decoration: none; color: #3f2d56;" :href="link">
    {{ text }}
  </a>
</template>