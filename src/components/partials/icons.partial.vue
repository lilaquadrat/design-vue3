<script setup lang="ts">
import type IconsPartial from '@/interfaces/IconsPartial';
import { computed, type ComputedRef } from 'vue';

const props = withDefaults(defineProps<IconsPartial>(), {
  colorScheme: 'colorScheme1',
  size       : 'medium',
});
const rotateClass: ComputedRef<string | undefined> = computed(() => (props.rotate ? `rotate${props.rotate}` : undefined));

</script>
<template>
  <span class="lila-icons-partial" :class="[type, colorScheme, size, rotateClass, { animate }]">
    <svg v-if="type === 'arrow-right'" xmlns="http://www.w3.org/2000/svg" width="24" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
    </svg>
    <svg v-if="type === 'arrow-left'" xmlns="http://www.w3.org/2000/svg" width="24" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    <svg v-if="type === 'arrow-right-long'" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
    </svg>
    <svg v-if="type === 'chevron-down'" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
    <svg v-if="type === 'chevron-up'" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
    <svg v-if="type === 'chevron-right'" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
    <svg v-if="type === 'chevron-left'" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
    <svg v-if="type === 'checked'" xmlns="http://www.w3.org/2000/svg" width="24" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <svg v-if="type === 'close'" xmlns="http://www.w3.org/2000/svg" width="24" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
    <svg v-if="type === 'zoom-in'" xmlns="http://www.w3.org/2000/svg" width="24" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    </svg>
    <svg v-if="type === 'zoom-out'" xmlns="http://www.w3.org/2000/svg" width="24" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="{2}">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
    </svg>
    <svg v-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" width="24" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <svg v-if="type === 'location'" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" class="w-6 h-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
    <svg v-if="type === 'play'" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>
    <svg v-if="type === 'pause'" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
    </svg>
    <svg v-if="type === 'muted'" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
    <svg v-if="type === 'unmuted'" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
    <svg v-if="type === 'calendar'" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
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

  &.colorScheme1,
  &.dark {
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

  &.white,
  &.bright {
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
