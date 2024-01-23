<script setup lang="ts">
import { useTranslations } from '@/plugins/translations';
import { computed, ref } from 'vue';

const { translate } = useTranslations();
const props = defineProps<{
  title: string;
  description: string;
  allergens: string[];
  properties: string[];
  price: string;
}>();
const showAllergensText = ref<boolean>();
const allergensNumbers = computed(() => {
  if (!props.allergens?.length) return null;

  return props.allergens.map((single) => translate.translate(`${single}Number`)).sort((a, b) => +a - +b);
});
const translatedAllergens = computed(() => {
  if (!props.allergens?.length) return null;

  return props.allergens.map((single) => translate.translate(single)).sort();
});
const translatedProperties = computed(() => {
  if (!props.properties.length) return null;

  return props.properties.map((single) => translate.translate(single)).sort();
});

function switchContent () {
  showAllergensText.value = true;
  setTimeout(() => {
    showAllergensText.value = false;
  }, 5000);
}
</script>
<template>
  <article class="lila-menu-item">
    <header>
      <h3 class="title">{{ title }}</h3>
      <h5 v-if="translatedProperties" class="properties">{{ translatedProperties.join(', ') }}</h5>
    </header>

    <h4 v-if="price" class="price">{{ price }}</h4>

    <p v-if="description" class="description">{{ description }}</p>

    <footer @click="switchContent" v-if="allergensNumbers" @key-up="switchContent" role="button" tabindex="0">
      <template v-if="!showAllergensText">
        {{ allergensNumbers.join(', ') }}
      </template>
      <template v-if="showAllergensText && translatedAllergens">
        {{ translatedAllergens.join(', ') }}
      </template>
    </footer>
    <slot></slot>
  </article>
</template>
<style lang="less" scoped>
.lila-menu-item {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-auto-rows: max-content;
  gap: 20px;

  .price,
  .title {
    font-size: @headline_XS;
    line-height: @headlineLineHeight_XS;

    @media @tablet, @desktop {
      font-size: @headline_S;
      line-height: @headlineLineHeight_S;
    }
  }

  .description,
  .properties,
  footer {
    font-size: @fontTextSmaller;

    @media @tablet, @desktop {
      font-size: @fontText;
    }
  }

  .price {
    grid-column-start: 2;
    grid-column-end: 3;
  }

  header {
    display: grid;
    gap: 10px;

    .title {
      .font-normal;
    }

    .properties {
      color: @color1;
      .font-normal;
      font-style: italic;
    }
  }

  footer,
  .description {
    grid-column-start: 1;
    grid-column-end: 3;

    @media @tablet, @desktop {
      grid-column-end: 2;
    }
  }

  .description {
    grid-row-start: 2;
    .font-normal;
  }

  footer {
    grid-row-start: 3;
    color: @grey;
  }
}
</style>
