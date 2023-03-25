<script setup lang="ts">


</script>

<template>
HELLO APP
  <RouterView />

</template>

<style lang="less">
* {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  background-repeat: no-repeat;

  list-style-type: none;

  text-decoration: none;
}

body {
  .font-normal;

  background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 57%, rgba(240,240,240,1) 100%);
  background-attachment: fixed;

  @media print {
    background: transparent;
    background-attachment: scroll;
  }

  color: @textColor;

  font-size: @fontText;
  .lineHeight(@fontText, 1.5);
}

@page {
  margin: 0;
  size: 210mm 297mm;
}

</style>
