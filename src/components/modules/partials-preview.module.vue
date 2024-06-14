<script setup lang="ts">
import type Textblock from '@/interfaces/textblock.interface';
import { computed } from 'vue';

const props = defineProps<{
    partial: string,
    partialData: {textblock?: Textblock, props: Record<string, unknown>}[]
}>();
const partialName = computed(() => `lila-${props.partial}-partial`);

</script>
<template>
    <section class="partials-preview-module">
        <section class="single-partial" v-for="(single, index) in partialData" :key="`single-partial-${index}`">
            <lila-textblock-partial v-bind="props" />
            <lila-textblock-partial v-if="single.textblock" v-bind="single.textblock" />
            <component :is="partialName" v-bind="single.props"/>
        </section>
    </section> 
</template>
<style lang="less" scoped>
.partials-preview-module {
    .module;
    .modulePadding('full');

    .multi(margin-top, 8);

    gap: 40px;
    
    max-width: @moduleWidth_M;

    .single-partial {
        display: grid;
        gap: 50px;
    }
}
</style>