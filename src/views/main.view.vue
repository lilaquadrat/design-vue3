<script setup lang="ts">
import useMainStore from '@/stores/main.store';
import { computed } from 'vue';

const mainStore = useMainStore();
const isDynamic = computed(() => mainStore.config?.dynamic);

</script>
<template>
    <lila-main-components-partial v-if="isDynamic" type="navigation"/>
    <RouterView />
    <lila-main-components-partial v-if="isDynamic" type="footer"/>
</template>