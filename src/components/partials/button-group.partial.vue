<template>
  <section :class="{gap:gap, center: center }" class="lila-button-group">
    <slot />
  </section>
</template>
<script setup lang="ts">
defineProps<{
  center?: boolean;
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

  &.center {
    justify-content: center;
  }

}
</style>
