<script setup lang="ts">
import type IconsPartial from '@/interfaces/IconsPartial';
import { onBeforeMount } from 'vue';
import { computed, getCurrentInstance, inject, ref } from 'vue';
// import triggerEvent from '@/plugins/events';

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
const linkMode: 'event' | 'link' | undefined = inject('linkMode');
const linkBase = inject('linkBase');
const linkWithBase = computed(() => (linkBase ? `${linkBase}/${props.link}` : props.link));
const isWhite = computed(() => props.variant?.includes('white'));
const isStatic = computed(() => props.attributes?.includes('static'));
const isEvent = computed(() => props.attributes?.includes('event'));
const type = computed(() => linkMode !== 'event' && !isStatic.value && !isEvent.value && !isExternal.value ? 'router-link': 'a');
const isExternal = ref<boolean>(false);

onBeforeMount(() => {

  analyse(props.link);

})

function analyse (link: string) {

  if (typeof link !== 'string') return;

  isExternal.value = !!link?.match(/^http/i);

}

function event ($event: MouseEvent) {

  if (isEvent.value || linkMode === 'event') {

    $event.preventDefault();

    // triggerEvent(props.link);

  }

}

</script>
<template>
  <component v-if="link" :class="[variant, classes, { hasIcon: icon, callToAction: props.callToAction, button: props.button }]" class="lila-link" :is="type" :to="linkWithBase" :href="linkWithBase" @click="event">
    {{ text }}
    <slot v-if="!text"></slot>
    <lila-icons-partial v-if="icon" :color-scheme="isWhite ? 'white' : 'color1'" :type="icon" size="smaller" />
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
    grid-template-columns: max-content 15px;
    gap: 5px
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
  }
}
</style>
