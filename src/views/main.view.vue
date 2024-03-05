<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('MAIN MOUNTED');
})
</script>
<template>
    <!-- <lila-main-components-partial type="navigation"/> -->
    <RouterView />
    <!-- <lila-main-components-partial type="footer"/> -->
</template>