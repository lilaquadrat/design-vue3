<script setup lang="ts">
import { onMounted, onBeforeUpdate, useSlots, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string
    modelValue: boolean
    error?: boolean
    required?: boolean
    description?: string
    disabled?: boolean
    noIndicator?: boolean
    text?: string
  }>(),
  {

  }
);
const slots = useSlots();
const textType = ref<string>('word');
const emit = defineEmits(['update:modelValue', 'change']);
const changeHandler = (event: Event) => {

  const target = event.target as HTMLInputElement;

  emit('update:modelValue', target.checked);
  emit('change', target.checked);

};

function setTextType (): void {
  
  const slotContent = slots.default ? slots.default() : null;
  const useText = props.text 
    ? props.text 
    : slotContent;

  if (useText?.length) {

    if (useText.length >= 30) textType.value = 'text';

    if (useText.length < 30) textType.value = 'word';

    if (useText.length === 0) textType.value = 'noText';

  } else {

    textType.value = 'noText';

  }

}

onMounted(() => setTextType());
onBeforeUpdate(() => setTextType());

</script>
<template>
  <section class="lila-checkbox-parent-container" :class="{error}">
    <label :class="[textType, { checked: modelValue, disabled: disabled, noIndicator }]" class="checkbox" tabindex="">
      <div class="indicator-text">
        <span class="indicator">
          <lila-icons-partial type="checked" size="small" colorScheme="white" />
        </span>

        <span class="label" v-if="textType !== 'noText'" :class="[textType]">
          <slot v-if="!text"></slot>
          <lila-description-partial inline v-if="description && !text">{{$translate(description)}}</lila-description-partial>
          {{ text }}
        </span>

      </div>

      <input type="checkbox" :name="name" :disabled="disabled" :checked="modelValue" @change="changeHandler" />
    </label>

    <div v-if="text" class="indicator-text">
      <span class="indicator"> </span>
      <span class="label" v-if="textType !== 'noText'" :class="[textType]">
        <slot></slot>
        <lila-description-partial inline v-if="description">{{$translate(description)}}</lila-description-partial>
      </span>

    </div>
    <lila-input-labels-partial hideLabel :error="error" :required="required" :disabled="disabled" />
  </section>
</template>
<style lang="less" scoped>

.lila-checkbox-parent-container {
  display: grid;
  gap: 0 20px;
  grid-template-columns: 1fr max-content;

  @media @desktop {
    gap: 0 40px;
  }

  .indicator-text {
    display: grid;
    grid-template-columns: 25px auto;
    gap: 0 20px;

    .label-container {
      grid-template-columns: 100%;
      grid-column-start: 2;
      text-align: right;
    }
  }

}

label.checkbox {
  display: grid;
  gap: 10px;

  .label,
  .description {
    .trans(color);
  }

  input {

    &[type='checkbox'] {
      display: none;
    }

  }

  &.noText {
    display: inline-block;
    min-width: auto;
    margin: 0;

    .indicator-text {
      display: inline;
    }

    .label-container {
      display: none;
    }
  }

  .label {
    .multi(margin-bottom, 2);

    justify-self: start;
    margin: 0;
    text-align: left;

    cursor: pointer;

    &.text {
      padding-top: 2px;
    }

    &.word {
      display: grid;
      gap: 5px;
      align-self: center;
      min-width: 160px;
      margin: 0;
      padding: 0;
    }

    &.noText {
      display: block;
      min-width: auto;
      margin: 0;
    }

    .description {
      .multi(padding-top, 1);
    }
  }

  .indicator {
    content: '';
    display: grid;
    width: 25px;
    height: 25px;
    border: solid 1px @textColor;

    cursor: pointer;

    transition: background .4s ease, border .4s ease;

    .lila-icons-partial {
      display: grid;
      align-self: center;
      justify-self: center;
    }
  }

  &.noIndicator {

    .indicator {
      display: none;
    }

    .indicator-text {
      grid-template-rows: min-content;
      grid-template-columns: auto;
    }
  }

  &.checked {

    .indicator {
      border: solid 1px @color1;
      background-color: @color1;

    }

  }

  &:hover {

    .indicator {

      :deep(.lila-icons-partial) {

        svg {
          stroke: @color1;
        }

      }

    }

    &.checked {

      .indicator {
        border: solid 1px @color3;
        background-color: @color3;

        :deep(.lila-icons-partial) {

          svg {

            stroke: @white;
          }

        }
      }

    }

    .label {
      color: @color3;
    }
  }

  &.disabled {

    pointer-events: none;
    user-select: none;

    .indicator {
      border-color: @grey;
    }

    &.checked {

      .indicator {
        background-color: @grey;
      }
    }

    .label,
    .description {
      color: @grey;
    }

  }

}
</style>
