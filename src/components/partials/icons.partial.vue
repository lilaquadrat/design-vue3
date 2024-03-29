<script setup lang="ts">
import type IconsPartial from '@/interfaces/IconsPartial';
import { computed, type ComputedRef } from 'vue';

const props = withDefaults(
  defineProps<IconsPartial>(),
  {
    colorScheme: 'colorScheme1',
    size       : 'medium'
  }
);
const rotateClass: ComputedRef<string|undefined> = computed(() => props.rotate ? `rotate${props.rotate}` : undefined); 

</script>
<template>
  <span class="lila-icons-partial" :class="[type, colorScheme, size, rotateClass, {animate}]">
  <svg v-if="type === 'arrow-right'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
  </svg>
  <svg v-if="type === 'arrow-left'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
  <svg v-if="type === 'chevron-down'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
  <svg v-if="type === 'checked'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
  </svg>
  <svg v-if="type === 'close'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
  <svg v-if="type === 'zoom-in'" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
  </svg>
  <svg v-if="type === 'zoom-out'" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
  </svg>
  <svg v-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
  <svg v-if="type === 'location'" xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6 h-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>

  </span>
</template>
 <!-- https://heroicons.com/ -->
<style lang="less" scoped>

.lila-icons-partial {
  display: grid;
  align-self: center;
  justify-content: center;
  pointer-events: none;

  svg {
    align-self: center;
    justify-self: center;
    stroke-width: 1.5;
  }

  &.rotate90 {

    svg {
      transform: rotate(90deg);
    }

  }

  &.rotate180 {

    svg {
      transform: rotate(180deg);
    }

  }

  &.animate {

    svg {
      .trans(transform);
    }
  }

  &.xl {
    width: 60px;
    height: 60px;

    svg {
      width: 60px;
      height: 60px;
    }
  }

  &.big {
    width: 30px;
    height: 30px;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  &.larger {
    width: 26px;
    height: 26px;

    svg {
      width: 26px;
      height: 26px;
    }
  }

  &.large {
    width: 24px;
    height: 24px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  &.medium {
    width: 20px;
    height: 20px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &.small {
    width: 16px;
    height: 16px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &.smaller {
    width: 10px;
    height: 10px;

    svg {
      width: 10px;
      height: 10px;
    }
  }
  &.colorScheme1, &.dark {

    svg {
      stroke: @color1;

      &.useFill {
        fill: @color1;
        stroke-width: 0;
      }
    }

  }

  &.colorScheme2 {

    svg {
      stroke: @color2;

      &.useFill {
        fill: @color2;
        stroke-width: 0;
      }
    }

  }

  &.colorScheme4 {

    svg {
      stroke: @color1;

      &.useFill {
        fill: @color1;
        stroke-width: 0;
      }
    }

  }

  &.white, &.bright {

    svg {
      stroke: @white;

      &.useFill {
        fill: @white;
        stroke-width: 0;
      }
    }

  }

  &.grey {

    svg {
      stroke: @grey;

      &.useFill {
        fill: @grey;
        stroke-width: 0;
      }
    }

  }

  &.red {

    svg {
      stroke: @error;

      &.useFill {
        fill: @error;
        stroke-width: 0;
      }
    }

  }
  &.green {
    svg {
      stroke: @success;

      &.useFill {
        fill: @success;
        stroke-width: 0;
      }
    }
  }

}
</style>