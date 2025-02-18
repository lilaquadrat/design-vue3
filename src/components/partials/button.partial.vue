<script setup lang="ts">
import type IconsPartial from '@/interfaces/IconsPartial';
import { hasSlotContent } from '@/mixins/hasSlotContent';
import triggerEvent from '@/plugins/events';
import useCallStore from '@/stores/calls.store';
import { computed, ref, useSlots } from 'vue';

defineOptions({
  inheritAttrs: false
})

type buttonProps = {
  doublecheck?: string
  disabled?: boolean
  text?: string
  icon?: IconsPartial['type']
  iconSize?: IconsPartial['size']
  noPadding?: boolean
  colorScheme?: string
  save?: boolean
  active?: boolean
  event?: string
  additionalData?: string
  type?: 'submit' | 'button'
  callId?: string
  variant?: string[]
} 

const callStore = useCallStore();
const props = withDefaults(defineProps<buttonProps>(),
  {
    type       : 'button',
    colorScheme: 'colorScheme1'
  }
);
const confirmed = ref(false);
const emit = defineEmits<{(e: string, event?: Event): void}>();
const iconColorScheme = computed(() => {

  if(props.variant?.includes('callToAction')) return 'bright';
  return ['colorScheme1', 'colorScheme3', 'error', 'success', 'error'].includes(props.colorScheme) ? 'bright' : 'dark'

})
const slotUsed = computed(() => hasSlotContent(useSlots().default));
const iconSize = computed(() => {

  if(props.iconSize) return props.iconSize;
  if(props.icon && !props.text) return 'medium';
  return props.icon ? 'smaller' : 'medium'

});
const state = computed(() => {

  if(props.callId) return callStore.calls[props.callId];

  return null

})

function triggerEventOnClick (event: MouseEvent) {

  triggerEvent(props.event as string, props.additionalData, event);

}

function confirm (event: MouseEvent): void {

  event.preventDefault();

  if(props.event) {

    triggerEventOnClick(event);

  } else {

    emit('click', event);
    if(props.type === 'submit') emit('submit', event);
  
  }

}

</script>
<template>
  <button class="lila-button" :disabled="disabled" :type="props.type" 
    :class="[
      colorScheme, 
      state, 
      variant, 
      {
        confirmed, 
        icon, 
        noPadding, 
        active, 
        iconText: icon && slotUsed, 
        iconWithoutText: icon && !text,
        eventWithSlot: event && !text,
        save 
      }, 
      $attrs.class
    ]" @click.stop="confirm">
    <span v-if="save"></span>
    <template v-if="text">{{ $replacer(text) }}</template>
    <slot v-if="!text"></slot>
    <lila-icons-partial v-if="icon" :colorScheme="iconColorScheme" :size="iconSize" :type="icon" animate :class="{rotate90: active}" />
  </button>
</template>
<style lang="less" scoped>
.lila-button {

  @keyframes border {
    0% {
      bottom: calc(100% - 3px);
      left: -17px;
    }

    25% {
      bottom: calc(100% - 3px);
      left: calc(100% - 3px);
    }

    50% {
      bottom: -17px;
      left: calc(100% - 3px);
    }

    75% {
      bottom: -17px;
      left: -17px;
    }

    100% {
      bottom: calc(100% - 3px);
      left: -17px;
    }
  }

  border: none;
  outline: none;
  background: transparent;

  white-space: nowrap;
  cursor: pointer;

  -webkit-tap-highlight-color: transparent;

  .trans(background);

  height: @buttonHeight;
  font-size: @fontTextSmaller;

  line-height: @buttonLineHeight;

  text-transform: uppercase;

  .font-head;
  .multi(padding, 0, 3);

  &.colorScheme1,
  &.colorScheme2 {

    &.save {

      &.init {
        background-color: transparent;
        color: @color1;
      }
    }

    &.success {
      background-color: @success;
      color: @white;
    }

  }

  &.colorScheme1 {
    background-color: @color3;
    color: @white;

    &:hover {
      background-color: @color1;
    }

  }

  &.white {
    background-color: @white;
    color: @color1;

    &:hover {
      background-color: @color2;
    }

  }

  &.error {
    background-color: @error;
  }

  &.colorScheme2 {
    background-color: @grey1;
    color: @textColor;

    &:hover {
      background-color: @color2;
    }

    &.router-link-active {
      background-color: @grey;

      &:hover {
        background-color: @grey1;
        color: @textColor;
      }

    }

  }

  &.transparent {
    padding: 0;
    background-color: transparent;
    color: @textColor;
    .trans(color);

    &:hover {
      color: @color1;
    }
  }

  &.hoverSchema1 {

    &:hover {
      background-color: @grey1;
      color: @textColor;
    }

  }

  &.icon {

    display: grid;
    padding: 0;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    min-width: 35px;

    &.iconText {
      grid-template-columns: max-content 15px;
      gap: 5px;
      .multi(padding, 0, 3);
      
      &.transparent {
        padding: 0;
      }
      
      &.callToAction {
        .multi(padding, 0, 3);
        &:hover {
          color: @white;
          background-color: @color3;
        }
      }

      &.iconWithoutText {
        justify-items: center;
        grid-template-columns: 1fr;
      }

    }
    
    .lila-icons-partial {
      pointer-events: none;
      .trans(opacity);
    }

    &:hover {
      .lila-icons-partial {
        opacity: .5;
      }
    }

  }

  &.noPadding {
    padding: 0;
  }

  &.full {
    width: 100%;
    text-align: center;
  }

  &.navigation {
    padding: 0;
  }

  &:disabled {
    background-color: @grey;
    pointer-events: none;
    user-select: none;
  }

  &.callToAction {

    .colorScheme1;
    .trans(background);
    .multi(padding, 0, 2);

    &:hover {
      color: @white;
    }
  }

  &.save {

    position: relative;
    overflow: hidden;

    &.pending {

      background-color: transparent;
      color: @color1;

      span {

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;

          width: 20px;
          height: 20px;

          background-color: @color1;

          animation-name: border;
          animation-duration: 1.5s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      }
    }

    &.resolved {
      background-color: @success;
      color: @white;
    }

    &.rejected {
      background-color: @error;
      color: @white;
    }

  }

  &.eventWithSlot {
    background-color: inherit;
    text-align: inherit;
    height: inherit;
    text-transform: inherit;

    padding: 0;

    &:hover {
      background-color: inherit;
    }

    &.iconText {
      text-align: center;
    }

    &.callToAction {
      background-color: @color1;

    &:hover {
      background-color: @color3;
    }
    }
  }

  &:not(.icon) {

    :deep(.lila-icons-partial) {
      width: 35px;
      .trans(opacity);
    }

    &:hover {

      :deep(.lila-icons-partial) {
        opacity: .6;
      }

    }

  }
}
</style>