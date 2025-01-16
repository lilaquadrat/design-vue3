<script setup lang="ts">
import type IconsPartial from '@/interfaces/IconsPartial';
import { computed, inject, useSlots } from 'vue';

defineOptions({ inheritAttrs: false });

// Access all available slots
const slots = useSlots();
const props = defineProps<{
  link?: string
  text?: string
  icon?: IconsPartial['type']
  attributes?: string[]
  classes?: string[]
  variant?: string[]
  callToAction?: boolean
  additionalData?: string
  button?: boolean
  disabled?: boolean
  [key: string]: any,
}>();
// const linkMode: 'event' | 'link' | undefined = inject('linkMode');
const linkBase = inject('linkBase');
const linkWithBase = computed(() => (linkBase ? `${linkBase}/${props.link}` : props.link));
const isWhite = computed(() => props.variant?.includes('white') || props.callToAction);
const mode = computed(() => props.link?.startsWith('http') ? 'external' : 'internal');
const type = computed(() => {

  if(mode.value === 'external') return 'a';

  return 'router-link';

});
const isSlotEmpty = computed(() => {
  // defaultSlot() returns an array of VNodes if present
  // => If undefined or zero-length, the slot is empty
  const defaultSlot = slots.default?.({});

  return !defaultSlot || defaultSlot.length === 0;
});

</script>
<template>
  <component v-if="link"
    :class="[variant, classes, $attrs.class, { hasIcon: icon, callToAction: props.callToAction, button: props.button, disabled: props.disabled, noText: !text && isSlotEmpty }]"
    class="lila-link" :is="type" :to="linkWithBase" :href="linkWithBase">
    <template v-if="text">{{ $replacer(text) }}</template>
    <slot v-if="!text"></slot>
    <lila-icons-partial v-if="icon" :color-scheme="isWhite ? 'white' : 'colorScheme1'" :type="icon"
      :size="callToAction || !text && icon ? 'medium' : 'smaller'" />
  </component>
</template>
<style lang="less" scoped>
.lila-link {
  color: @link;
  .font-normal;
  .trans(color);

  &:hover {
    color: @linkHover;
  }

  &.hasIcon {
    display: grid;
    grid-template-columns: max-content 15px;
    gap: 5px;

    &.noText {
      grid-template-columns: 40px;
      justify-items: center;

      .basicHover;
    }
  }

  &.white {
    color: @white;
  }

  &.callToAction {
    .trans(background);

    display: inline-block;
    height: @buttonHeight;

    background-color: @color4;
    color: @white;

    font-size: @fontTextSmaller;
    line-height: @linkLineHeight;
    text-transform: uppercase;

    transition: background @aTime @aType;

    .font-head;
    .multi(padding, 0, 3);

    &.hasIcon {
      display: grid;
    }

    &:hover {
      background-color: @color5;
    }

    &.colorScheme2 {
      background-color: @color3;
      color: @white;

      &:hover {
        background-color: @color1;
      }

      &.router-link-active {
        background-color: @grey;

        &:hover {
          background-color: @grey1;
          color: @textColor;
        }
      }
    }

    &.white {
      border-color: @white;
      background-color: transparent;
      color: @white;

      &:hover {
        border-color: @color1;
        color: @color1;
      }
    }

    &.disabled {
      background-color: @grey;
      pointer-events: none;
      user-select: none;
    }
  }
}
</style>
