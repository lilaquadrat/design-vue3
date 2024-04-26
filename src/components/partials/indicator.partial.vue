<script setup lang="ts">

const props = defineProps<{
  small?: boolean
  medium?: boolean
  large?: boolean
  variant?: string[]
}>();

</script>
<template>
  <div class="lila-loading-indicator" :class="[{ small: props.small, medium: props.medium, large: props.large }, variant]">
    <div />
    <div />
    <div />
    <div />
  </div>
</template>
<style lang="less" scoped>

.lila-loading-indicator {
  position: relative;
  display: grid;

  width: @buttonHeight;
  height: @buttonHeight;

  &.small {
    width: 20px;
    height: 20px;
  }

  &.large {
    width: 60px;
    height: 60px;
  }

  div {
    position: absolute;
    align-self: center;
    width: 20%;
    background-color: @color1;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }

    &:nth-child(1) {
      left: 0;
      animation: loading-indicator1 .6s infinite;
    }

    &:nth-child(2) {
      left: 0;
      animation: loading-indicator2 .6s infinite;
    }

    &:nth-child(3) {
      left: 40%;
      animation: loading-indicator2 .6s infinite;
    }

    &:nth-child(4) {
      justify-self: end;
      animation: loading-indicator3 .6s infinite;
    }
  }

  &.bright {
    div {
      background-color: @white;
    }
  }
}

@keyframes loading-indicator1 {

  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes loading-indicator3 {

  0% {
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(0);
  }
}

@keyframes loading-indicator2 {

  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(200%, 0);
  }
}
</style>
