<script setup lang="ts">
import { useTranslations } from '@/plugins/translations';
import { computed } from 'vue';

const { translate } = useTranslations();
const allergens = [
  'celery',
  'crustaceans',
  'eggs',
  'fish',
  'gluten-containing-grains',
  'lupin',
  'milk',
  'molluscs',
  'mustard',
  'nuts',
  'peanuts',
  'sesame-seeds',
  'soybeans',
  'sulfur-dioxide-and-sulphites',
];
/**
* Returns allergens sorted by their translated titles.
* Each allergen is mapped to an object containing its translated title and original value.
* Sorting is based on the translated title, ensuring compatibility with different locales.
*/
const allergenTranslatedSorted = computed(() => allergens.map((single) => ({ title: translate.translate(single), value: single })).sort((a, b) => a.title.localeCompare(b.title)));
const props = defineProps<{
  variant: string[];
}>();

</script>
<template>
  <section class="lila-menu-allergens" :class="[variant]">
    <h3>{{ $translate('allergens') }}</h3>
    <section class="allergens-container" v-if="allergenTranslatedSorted">
      <h5 v-for="(allergen, index) in allergenTranslatedSorted" :key="`single-allergen-${index}`">
        <span>{{ $translate(`${allergen.value}Number`) }}</span>
        <span>{{ allergen.title }}</span>
      </h5>
    </section>

    <slot></slot>
  </section>
</template>
<style lang="less" scoped>
.lila-menu-allergens {
  .module;
  gap: 40px;

  h3 {
    color: @color1;
    .font-normal;
    font-size: @headline_M;
  }

  h5 {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 10px;
    font-variant-numeric: lining-nums;
    .font-normal;
  }

  .allergens-container {
    display: grid;
    grid-template-columns: 1fr;

    @media @tablet {
      grid-template-columns: 1fr 1fr;
    }

    @media @desktop {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    gap: 20px;
  }

}
</style>
