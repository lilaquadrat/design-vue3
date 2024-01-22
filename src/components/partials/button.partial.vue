<script setup lang="ts">
import type IconsPartial from '@/interfaces/IconsPartial';
import { ref } from 'vue';

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(
  defineProps<{
        doublecheck?: string,
        disabled?: boolean,
        icon?: IconsPartial['type'],
        noPadding?: boolean,
        colorScheme?: string,
        active?: boolean
    }>(),
  {}
);
const showCheck = ref(false);
const timeout = ref<number>();
const confirmed = ref(false);
const emit = defineEmits<{(e: string, event?: Event): void}>();
const check = (): void => {

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
};
const confirm = (event: MouseEvent): void => {

  console.log('confirm');
  event.preventDefault();

  if (props.doublecheck) {

    check();

  } else {

    emit('click', event);

  }
};

</script>
<template>
  <button class="lila-button" :disabled="disabled" type="button" :class="[colorScheme, { doublecheck, showCheck, confirmed, icon, noPadding, active }, $attrs.class]" @click.stop="confirm">
    <slot v-if="!showCheck && !confirmed" />
    <span v-if="showCheck">Please confirm your action.</span>
    <span v-if="confirmed">confirmed</span>
    <lila-icons-partial v-if="icon" :type="icon" size="smaller" animate :class="{rotate90: active}" />
  </button>
</template>
<style lang="less" scoped>
.lila-button {

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

        span {

          &:after {
            background-color: @color1;
          }
        }
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
    grid-template-columns: max-content 15px;
    gap: 5px;
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

  &.scrollButton {
    display: grid;
    text-align: center;
    .font-head;

    .icon {
      justify-self: center;
      margin-top: 5px;
    }
  }
}
</style>