<script setup lang="ts">

const test = 3;

</script>

<template>
    <article class="second-screen screen">

        second view {{ test }}
        <router-link :to="{ name: 'editor' }">EDITOR</router-link>
        <content-module :content="{ test: 3 }" />

    </article>
</template>