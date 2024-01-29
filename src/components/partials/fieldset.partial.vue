<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    extendedGap?: boolean
    legend?: string

}>();

</script>
<template>
    <fieldset class="lila-fieldset"
    :class="{extendedGap}">
    <legend v-if="legend">
        <span class="text">{{ $translate(legend)}}</span>
        <hr />
    </legend>
        <slot />
    </fieldset>
</template>

<style scoped lang="less">
    fieldset {
        display: grid;
        gap: 20px;
        border: 0;

        .multi(padding, 8, 0, 10, 0);

        &.extendedGap  {
            gap: 40px
        }

        legend  {
            position: relative;
            display: grid;
            grid-template-columns: max-content 1fr;

            width: 100%;
            text-transform: uppercase;

            .text {
            position: relative;
            z-index: 400;
            background-color: @white;
            color: @color1;
            mix-blend-mode: multiply;
            .multi(padding-right, 2);
            .font-head;
            }

            hr {
            align-self: center;
            height: 2px;
            background-color: @color1;
            }
        }

    }
</style>