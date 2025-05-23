<script setup lang="ts">
import type {ListCategoryExtended} from '@/interfaces/ListCategoryExtended.interface';
import type { ParsedError } from '@/libs/ActionNotice';
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  categories: ListCategoryExtended[];
  required: boolean;
  error?: ParsedError;
  variant: string[]
}>();
const emits = defineEmits(['update:modelValue']);
const changeHandler = (selected: string) => {
  emits('update:modelValue', selected);
};
const hasError = computed(() => !!props.error?.error);
const highlight = computed(() => props.variant?.includes('categoriesHighlight'));
const usePercent = computed(() => props.variant?.includes('categoriesPercent'));
const hideFreeSlots = computed(() => props.variant?.includes('hide-free-slots'));

</script>
<template>
  <section class="lila-select-category-partial">
    <label
      v-for="(single, index) in categories" 
      :key="`select-${index}`" 
      class="single-category" 
      :class="[variant, {'not-selected': single.id !== modelValue, disabled: single.disabled || single.percentAvailable && single.percentAvailable <= 0, free: !single.price?.amount, limited: single.amount}, hideFreeSlots]" 
      :value="single.id"
    >
     
      <div class="indicator">
        <span class="active" />
      </div>
      <h1>{{ single.name }}</h1>
      <h4 v-if="(single.amount && !hideFreeSlots) || (single.disabled || single.percentAvailable && single.percentAvailable <= 0)" class="available">
        <span v-if="single.amount && !hideFreeSlots">{{ $translateWithDiff('LIST_CATEGORY_LIMITED_AVAILABILITY', single.amount) }}</span>
        <span v-if="single.disabled" class="highlight notAvailable">{{ $translate('not available') }}</span>
        <span v-if="single.percentAvailable && single.percentAvailable <= 0" class="highlight sold-out">{{ $translate('LIST_CATEGORY_SOLD_OUT') }}</span>
        <span v-if="highlight && single.percentAvailable && single.percentAvailable > 0 && single.percentAvailable <= 20 && usePercent && single.percentUsed && !hideFreeSlots" class="highlight">
          {{ $translate('LIST_CATEGORY_LAST_CHANCE_PERCENT', [single.percentUsed.toString()]) }}
        </span>
        <span v-if="highlight && single.percentAvailable && single.percentAvailable > 0 && single.percentAvailable <= 20 && !usePercent && single.available && !hideFreeSlots" class="highlight">
          {{ $translateWithDiff('LIST_CATEGORY_LAST_CHANCE', single.available).toString() }}
        </span>
      </h4>
      <h3>
        <template v-if="single.price?.amount">{{ single.price.amount }} {{ $translate(single.price.currency) }}</template>
        <template v-if="!single.price?.amount">{{ $translate('no charge') }}</template>
      </h3>
      <h4 v-if="single.price?.amount && single.price.tax" class="tax">{{ $translate('price_with_tax', [single.price.tax.toString()]) }}</h4>
      <p class="description">{{ single.description }}</p>
      <input name="category" :value="single.id" type="radio" @change="changeHandler(single.id)">
    </label>

    <lila-input-labels-partial :error="hasError" :required="required">
      <slot />
    </lila-input-labels-partial>
  </section>
</template>
<style lang="less" scoped>

.lila-select-category-partial {

  display: grid;

  gap: 30px 0;
  width: 100%;

  @media @tablet, @desktop {
    gap: 50px 0;
  }

  .single-category {
    display: grid;
    grid-template-rows: max-content max-content max-content;
    grid-template-columns: max-content 1fr max-content;
    gap: 5px 15px;
    align-items: start;
    cursor: pointer;

    input {
      display: none;
    }

    .highlight {
      margin-top: 30px;
      padding: 0 3px;
      background-color: @error;
      color: @white;
      font-size: @fontTextSmaller;

      &.sold-out, &.notAvailable {
        background-color: @grey;
      }

    }

    .indicator {
      display: grid;
      align-content: center;
      align-self: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border: solid 1px @color1;
      border-radius: 50%;

      .active {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: @color1;
      }
    }

    h1, h3 {
      .font-head;
      color: @color1;
      .trans(color);

      font-size: @headline_XS;
      text-transform: uppercase;

      @media @tablet, @desktop {
        font-size: @headline_S;
      }
    }

    .description {
      grid-row-start: 2;
      grid-column-start: 2;
      grid-column-end: 3;
    }

    h3 {
      text-align: right;
    }

    h4 {
      grid-row-start: 2;
      grid-column-start: 3;
      grid-column-end: 4;
      color: @textColor;
      font-size: @fontSmall;
      text-align: right;
      .font-normal;
    }

    &.not-selected {

      h1, h3, h4 {
        color: @color1;
      }

      .indicator {

        .active {
          display: none;
        }
      }

      &:hover {

        .indicator {

          .active {
            display: grid;
          }
        }
      }

    }

    &.hide-free-notice.free {

      h3 {
        display: none;
      }
    }

    &.limited, &.disabled {
      grid-template-rows: max-content max-content max-content max-content;

      .available {
        .font-bold;
        grid-row-start: 2;
        grid-column-start: 2;
        grid-column-end: 3;

        font-size: @fontText;
        text-align: left;

        .highlight {
          margin: 0;
        }
      }

      p {
        grid-row-start: 3;
      }

    }

    &.limited {

      &.hide-free-slots:not(.disabled) {
        p {
          grid-row-start: 2;
        }
      }

      &.disabled {
        .available {
          display: grid;
          gap: 5px;

          grid-template-columns: max-content max-content;
        }
      }
    }

    &.disabled.not-selected {

      pointer-events: none;

      h1, h3, .description, h4 {
        color: @grey;
      }

      .indicator {
        border-color: @grey;
      }

      &:hover {

        h1, h3 {
          color: @grey;
        }
      }

    }

    .notAvailable {
      grid-column-start: 2;
      grid-column-end: 3;
      text-transform: uppercase;
    }

  }

}
</style>
