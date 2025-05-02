<script setup lang="ts">
import type IconsPartial from '@/interfaces/IconsPartial';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  link?: string
  event?: string
  text?: string
  icon?: IconsPartial['type']
  attributes?: string[]
  classes?: string[]
  variant?: string[]
  callToAction?: boolean
  additionalData?: string
  button?: boolean
  disabled?: boolean
  mode?: 'internal' | 'external' | 'event'
  [key: string]: any,
  colorScheme?: string
}>();

</script>
<template>
  <component :is="event ? 'lila-button-partial' : 'lila-link-partial'" v-if="event || link" v-bind="props">
    <slot />
  </component>
  <slot v-if="!link && !event" />
</template>

