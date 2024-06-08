<script setup lang="ts">
import { onBeforeMount } from 'vue';
import type { ParsedError } from '../../libs/ActionNotice';
import { computed, watch, ref } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  modelValue?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errorMessage?: boolean
  error?: ParsedError
  selectOnFocus?: boolean
  dontClear?: boolean
  /**
   * defines with keys are allowed as input
   */
  inputValidation?: string
  /**
   * defines with string is allowed as output
   *
   * the update will  not be sent if the produced string does not match this validation
   */
  outputValidation?: string
}>();
const inputElement = ref<HTMLInputElement>();
let tempValue: string = '';
const debounceTime: number = 50;
const timeout = ref<ReturnType<typeof setTimeout>>();
const emit = defineEmits(['update:modelValue', 'focus', 'enter', 'keydown', 'blur']);
const whitelistedKeys = ['Escape', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Delete', 'Tab'];

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

    if(props.outputValidation) {

      if(tempValue.match(props.outputValidation)) {
        emit('update:modelValue', event ? target.value : '');
      }

    } else {

      emit('update:modelValue', event ? target.value : '');

    }

  }, debounceTime);

};

function checkInput (event: KeyboardEvent) {

  const input = inputElement.value as HTMLInputElement;

  if(!input) return;

  let tempValue: string;

  if (event.key === 'Enter') {

    emit('enter');
    event.preventDefault();

  } else {

    emit('keydown', event);

  }

  if (whitelistedKeys.includes(event.key)) return;

  if(input.selectionStart !== null && input.selectionEnd && (input.selectionStart < input.selectionEnd)) {

    tempValue = event.key;
    
  } else {

    tempValue = input.value + event.key;

  }

  if (event.key === 'Escape') {

    if (props.dontClear) {

      input.blur();

    } else if (input.value.length > 0) {

      clear();

    } else if (input.value.length === 0) {

      blur();

    }

  }

  if(props.inputValidation) {

    if(!tempValue.match(props.inputValidation)) {

      event.preventDefault();

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
  if (props.selectOnFocus) inputElement.value?.select();

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

