<template>
  <section :class="{gap:gap, center: center }" class="lila-button-group">
    <slot></slot>
  </section>
</template>
<script setup lang="ts">
defineProps<{
  gap: boolean;
  center: boolean;
}>();

</script>
<style lang="less" scoped>

.lila-button-group {

  display: flex;
  gap: 10px;

  justify-content: end;
  flex-direction: row-reverse;
  flex-wrap: wrap;

  &.gap {
    gap: 10px 20px;
  }

  &.center {
    justify-content: center;
  }

}
</style>
