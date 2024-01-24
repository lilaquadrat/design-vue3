<script setup lang="ts">

const emit = defineEmits(['close']);


defineProps<{
  hideButton?: boolean
}>();

function close () {
  emit('close');
}

</script>
<template>
  <section class="content-head">
    <h3><slot /></h3>
    <lila-button-partial v-if="!hideButton" type="button" icon="close" size="medium" color-scheme="transparent" @click="close"></lila-button-partial>
  </section>
</template>
<style lang="less" scoped>

.content-head {

  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: @buttonHeight;
  box-shadow: 0 5px 5px -5px @grey;
  .index(5);

  h3 {
    display: grid;
    align-content: center;
    overflow: hidden;
    background-color: @white;
    color: @color1;
    text-overflow: ellipsis;
    white-space: nowrap;
    .multi(padding, 0, 8);

  }

}
</style>
