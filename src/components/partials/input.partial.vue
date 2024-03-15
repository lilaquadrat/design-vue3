<script setup lang="ts">
import { onBeforeMount } from 'vue';
import type { ParsedError } from '../../libs/ActionNotice';
import { computed, watch, ref } from 'vue';

const props = defineProps<{
  modelValue?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: boolean;
  error?: ParsedError;
}>();
const inputElement = ref<HTMLInputElement>();
let tempValue: string = '';
const debounceTime: number = 50;
const timeout = ref<ReturnType<typeof setTimeout>>();
const emit = defineEmits(['update:modelValue', 'focus', 'enter', 'keydown', 'blur']);

watch(() => props.modelValue, () => {

  if (props.modelValue !== undefined) {
    tempValue = props.modelValue;
  }

});

onBeforeMount(() => {

  tempValue = props.modelValue as string;

})

const update = (event: KeyboardEvent) => {

  const target = event?.target as HTMLInputElement;

  tempValue = target?.value;

  clearTimeout(timeout.value);

  timeout.value = setTimeout(() => {

    emit('update:modelValue', event ? target.value : '');

  }, debounceTime);

};

function checkInput (event: KeyboardEvent) {

  const input = inputElement.value as HTMLInputElement;

  if (event.key === 'Enter') {

    emit('enter');
    event.preventDefault();

  } else {

    emit('keydown', event);

  }

  if (['Backspace', 'Enter'].includes(event.key)) return;

  if (event.key === 'Escape') {

    if (input.value.length > 0) {

      clear();

    } else if (input.value.length === 0) {

      blur();

    }

  }

}

function clear () {

  const input = inputElement.value as HTMLInputElement

  input.value = '';
  emit('update:modelValue', '');

}

function focus () {

  emit('focus');

}

function blur () {

  emit('blur');

}

const errorMessage = computed(() => (props.error?.keyword !== 'requires' ? props.error?.error : null));
const hasError = computed(() => !!props.error?.error);

</script>
<template>
  <label ref="element" class="lila-input" :class="{ error: hasError }">
    <input ref="inputElement" type="text" :placeholder="$translate(placeholder as string)" :disabled="disabled" :value="tempValue" @keydown="checkInput($event)" @keyup="update" @focus="focus" @blur="blur" />
    <lila-input-labels-partial :error="hasError" :required="required" :disabled="disabled">
      <slot />
    </lila-input-labels-partial>

    <lila-description-partial v-if="errorMessage" :background="false" type="error">
      {{ errorMessage }}
    </lila-description-partial>
  </label>
</template>

<style lang="less" scoped>
.lila-input {
  display: grid;
  gap: 5px;

  input {
    padding: 5px 0;
    border: 0;
    border-bottom: 1px @color1 solid;
    background-color: transparent;
    color: @textColor;
    outline: none;
    font-size: @fontText;
    line-height: 18px;

    .trans(border-color);

    &:hover {
      border-bottom: 1px @grey solid;
    }
  }

  &.error {
    input {
      border-color: @error;
    }
  }

  input:disabled {
    pointer-events: none;

    &:hover {
      border-bottom: 1px @color1 solid;
    }
  }
}
</style>

