<script setup lang="ts">
import { hasSlotContent } from '@/mixins/hasSlotContent';
import { computed, useSlots } from 'vue';
  
defineProps<{
    required?: boolean;
    disabled?: boolean;
    hideLabel?: boolean;
    error?: boolean;
  }>();
  
const slots = useSlots();
const slotUsed = computed(() => hasSlotContent(slots.default));
  
</script>
<template>
  <div v-if="slotUsed || required || disabled" class="label-container" :class="{error, hideLabel}">
    <span v-if="!hideLabel" class="label">
      <slot />
    </span>
    <span v-if="required && !disabled" class="required">{{ $translate('required') }}</span>
    <span v-if="disabled" class="disabled">{{ $translate('disabled') }}</span>
  </div>
</template>
<style lang="less" scoped>
  
  .label-container {
  
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  
    &.hideLabel {
      grid-template-columns: 1fr;
    }
  
    .label, .required, .disabled {
      font-size: @fontTextSmaller;
      text-transform: uppercase;
    }
  
    .required, .disabled {
      text-align: right;
    }
  
    &.error {
  
      .required {
        .font-bold;
        color: @error;
      }
  
    }
  
  }
  </style>
  