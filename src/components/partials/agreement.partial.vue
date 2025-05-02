<script setup lang="ts">
defineProps<{
  modelValue: boolean,
  error?: boolean,
  contentId: string,
  required?: boolean,
  compact?: boolean,
  predefined?: boolean,
}>();

const emits = defineEmits(['update:modelValue']);
const changeHandler = (checked: boolean) => {
  emits('update:modelValue', checked);
};

</script>
<template>
  <section class="lila-agreement-partial" :class="{compact, required}">
    <lila-checkbox-partial name="agreement" :compact="compact" :required="required" :error="error" :model-value="modelValue" @change="changeHandler">
      <slot />
    </lila-checkbox-partial>

    <lila-input-labels-partial v-if="compact" hide-label :error="error" :required="required" />
    <lila-content-container-partial :id="predefined ? contentId : undefined" :predefined="predefined" :internal-id="!predefined ? contentId : undefined" overlay>
      {{ $translate('show content') }}
    </lila-content-container-partial>
  </section>
</template>
<style lang="less" scoped>

.lila-agreement-partial {

  display: grid;
  width: 100%;
  grid-template-columns: 45px 1fr;
  gap: 5px 0;

  .lila-checkbox-parent-container {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  &.compact.required {
    grid-template-columns: 45px 1fr 1fr;

    .lila-checkbox-parent-container {
      grid-column-start: 1;
      grid-column-end: 4;
    }

    .label-container {
      grid-column-start: 3;
    }
  }

  .content-container-full {
    grid-column-start: 2;
    grid-row-start: 2;
  }

}
</style>
