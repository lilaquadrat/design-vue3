<script setup lang="ts">
import type MenuCategoryElement from '@/interfaces/MenuCategory.interface';
import type Textblock from '@/interfaces/textblock.interface';
import { useInview } from '@/plugins/inview';
import { ref } from 'vue';

const props = defineProps<{
  id?: string;
  variant: string[];
  textblock?: Textblock;
  intro?: Textblock;
  categories: MenuCategoryElement[];
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });

</script>
<template>
  <section :id="id" ref="element" :class="[variant, inviewState]" class="lila-menu-module lila-module">

    <header>

      <lila-textblock-partial class="title" :variant="['center', 'font-extra', 'horizontalLine']" v-bind="textblock" />

      <lila-menu-navigation-partial :categories="categories" />

      <lila-textblock-partial class="intro" :variant="['center']" v-bind="intro" />

    </header>


    <section class="category-container">

      <lila-menu-category-partial v-for="(category, index) in categories" v-bind="category" :key="`single-category-${index}`" />

    </section>

    <lila-menu-allergens-partial />

  </section>
</template>
<style lang="less" scoped>

.lila-menu-module {
  .module;
  .modulePadding('none');
  gap: 50px;

  @media @tablet, @desktop {
    gap: 120px;
  }

  max-width: @moduleWidth_M;

  header {
    display: grid;
    gap: 50px;
  }

  :deep(.lila-textblock.title) {

    h1 {
      font-size: @headline_L;
      letter-spacing: -1.5px;

      @media @tablet, @desktop {
        font-size: @headline_XL;

      }
    }

  }

  .intro, .lila-textblock.title {
    .module;
  }

  .category-container {
    display: grid;
    gap: 140px;
  }
}

</style>
