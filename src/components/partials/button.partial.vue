<script setup lang="ts">
import type IconsPartial from '@/interfaces/IconsPartial';
import useCallStore from '@/stores/calls.store';
import { computed, ref, useSlots } from 'vue';

defineOptions({
  inheritAttrs: false
})

const callStore = useCallStore();
const props = withDefaults(
  defineProps<{
        doublecheck?: string,
        disabled?: boolean,
        icon?: IconsPartial['type'],
        noPadding?: boolean,
        colorScheme?: string,
        save?: boolean,
        active?: boolean,
        type?: 'submit' | 'button'
        callId?: string
    }>(),
  {
    type       : 'button',
    colorScheme: 'colorScheme1'
  }
);
const showCheck = ref(false);
const timeout = ref<number>();
const confirmed = ref(false);
const emit = defineEmits<{(e: string, event?: Event): void}>();
const iconColorScheme = computed(() => ['colorScheme1', 'colorScheme3', 'error', 'success', 'error'].includes(props.colorScheme) ? 'bright' : 'dark')
const slotUsed = computed(() => !!useSlots().default);
const state = computed(() => {

  if(props.callId) return callStore.calls[props.callId];

  return null

})

function check () {

  if (!showCheck.value) {

    showCheck.value = true;
    timeout.value = window.setTimeout(() => {

      showCheck.value = false;

    }, 5000);

  } else {

    showCheck.value = false;
    confirmed.value = true;

    clearTimeout(timeout.value);

    timeout.value = window.setTimeout(() => {

      confirmed.value = false;

    }, 15000);

    emit('confirmed');
    // emit('click');

  }
}

const confirm = (event: MouseEvent): void => {

  console.log('confirm');
  event.preventDefault();

  if (props.doublecheck) {

    check();

  } else {

    emit('click', event);
    if(props.type === 'submit') emit('submit', event);

  }
};

</script>
<template>
  <button class="lila-button" :disabled="disabled" :type="props.type" :class="[colorScheme, state, { doublecheck, showCheck, confirmed, icon, noPadding, active, iconText: icon && slotUsed, save, }, $attrs.class]" @click.stop="confirm">
    <span v-if="save"></span>
    <slot v-if="!showCheck && !confirmed" />
    <span v-if="showCheck">Please confirm your action.</span>
    <span v-if="confirmed">confirmed</span>
    <lila-icons-partial v-if="icon" :colorScheme="iconColorScheme" :size="icon && slotUsed ? 'smaller' : 'medium'" :type="icon" animate :class="{rotate90: active}" />
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
    }

  }

  &.noPadding {
    padding: 0;
  }

  &.full {
    width: 100%;
    text-align: center;
  }

  &:disabled {
    background-color: @grey;
    pointer-events: none;
    user-select: none;
  }

  &.callToAction {
    .colorScheme1;
    .trans(background);
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
}
</style>