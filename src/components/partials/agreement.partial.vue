<script setup lang="ts">
defineProps<{
  modelValue: boolean,
  error?: boolean,
  contentId: string,
  required?: boolean,
  predefined?: boolean,
}>();

const emits = defineEmits(['update:modelValue']);
const changeHandler = (checked: boolean) => {
  console.log(checked);
  emits('update:modelValue', checked);
};

</script>
<template>
  <section class="lila-agreement-partial">
    <lila-checkbox-partial name="agreement" :required="required" :error="error" :modelValue="modelValue" @change="changeHandler"><slot /></lila-checkbox-partial>

    <lila-content-container-partial :predefined="predefined" :id="predefined ? contentId : undefined" :internalId="!predefined ? contentId : undefined" overlay>{{$translate('show content')}}</lila-content-container-partial>

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

  .content-container-full {
    grid-column-start: 2;
    grid-row-start: 2;
  }

}
</style>
