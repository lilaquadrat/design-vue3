<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isClient = ref<boolean>(false);

onMounted(() => isClient.value = true);

</script>
<template>
    <slot v-if="isClient" />
</template>
