<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    partial: string,
    partialData: Record<string, unknown>
}>();
const partialName = computed(() => `lila-${props.partial}-partial`);

</script>
<template>
    <section class="partials-preview-module">
        <component :is="partialName" v-bind="props.partialData"/>
    </section> 
</template>
<style lang="less" scoped>
.partials-preview-module {
    .module;
    .modulePadding('full');
    
    max-width: @moduleWidth_M;
}
</style>