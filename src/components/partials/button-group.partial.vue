<template>
  <section :class="{gap:gap}" class="lila-button-group">
    <slot></slot>
  </section>
</template>
<script setup lang="ts">
defineProps<{
  gap?: boolean;
}>();

</script>
<style lang="less" scoped>

.lila-button-group {

  display: flex;
  gap: 10px;

  justify-content: end;
  flex-wrap: wrap;

  &.gap {
    gap: 10px 20px;
  }

}
</style>
