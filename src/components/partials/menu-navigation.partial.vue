<template>
    <section class="lila-menu-navigation">

        <nav class="naviagtion-container">
          <template v-for="(single, index) in categorieTitles" :key="`single-category-item-${index}`">
            <lila-link-partial :link="`#${single.anchor}`" :attributes="['static']">{{ single.title }}</lila-link-partial>
          </template>
        </nav>

      <slot></slot>
    </section>
  </template>
<script setup lang="ts">
import type MenuCategoryElement from '@interfaces/MenuCategory.interface';
import getAnchor from '@/mixins/getAnchor';
import { computed } from 'vue';

const props = defineProps<{
  categories: MenuCategoryElement[];
}>();
const categorieTitles = computed(() => {

  const categories: {title: string, anchor: string}[] = [];

  props.categories?.forEach((single) => {

    if (!single.textblock?.headline) return null;

    categories.push( {
      title : single.textblock.headline,
      anchor: getAnchor(single.textblock.headline),
    });

  });

  return categories;

});

</script>
<style lang="less" scoped>

.lila-menu-navigation {
  .module;

  .naviagtion-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 25px;
    justify-content: center;
    justify-items: center;

  }
}
</style>

