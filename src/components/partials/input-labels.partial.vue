<script setup lang="ts">
import {defineProps, computed, defineSlots} from 'vue'

const prop = defineProps<{
    required : boolean
    disabled?: boolean
    error? : boolean
    hideLabel?: boolean
}>();
const slot = defineSlots<{
    default(): any
}>();
const slotUsed = computed(() => slot.default?.().length )

</script>
<template>
<div
v-if="slotUsed || required || disabled"
class="label-container"
:class="{error, hideLabel}"
>
<span
class="label"
v-if="!hideLabel">
    <slot />
</span>
<span class="required" v-if="required && !disabled">
{{ $translate('required') }}
</span>
<span class="disabled" v-if="disabled">{{ $translate('disabled') }}</span>
</div>
</template>
<style lang="less" scoped>
 .label-container {
    background-color: lightyellow;
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
    &.error {

    .required {
    .font-bold;
    color: @error;
    
    }

    }
 }
</style>