<script setup lang="ts">
import type MenuItemElement from '@/interfaces/MenuItem.interface';
import type Textblock from '@/interfaces/textblock.interface';
import getAnchor from '@/mixins/getAnchor';
import { computed } from 'vue';

const props = defineProps<{
  textblock: Textblock
  items: MenuItemElement[]
}>();
const anchor = computed(() => getAnchor(props.textblock.headline as string));

</script>
<template>
  <section :id="anchor" class="lila-menu-category">
    <lila-textblock-partial v-if="textblock" v-bind="textblock" />

    <section class="items-container">
      <lila-menu-item-partial v-for="(item, index) in items" v-bind="item" :key="`single-category-item-${index}`" />
    </section>

    <slot></slot>
  </section>
</template>
<style lang="less" scoped>
.lila-menu-category {
  .module;

  :deep(.lila-textblock) {
    border-bottom: solid 2px @color2;
    .multi(padding-bottom, 2);
    .multi(margin-bottom, 6);

    @media @tablet, @desktop {
      .multi(padding-bottom, 3);
      .multi(margin-bottom, 7);
    }

    h1 {
      color: @color1;
      font-size: @headline_M;

      @media @tablet, @desktop {
        font-size: @headline_L;
      }
    }
  }

  .items-container {
    display: grid;
    gap: 80px;

    @media @desktop {
      grid-template-columns: 1fr 1fr;
      gap: 80px 120px;
    }
  }
}
</style>
