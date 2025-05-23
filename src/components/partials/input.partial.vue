<script setup lang="ts">
import { onBeforeMount, useAttrs } from 'vue';
import type { ParsedError } from '../../libs/ActionNotice';
import { computed, watch, ref, onServerPrefetch } from 'vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
  modelValue?: string | number
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errorMessage?: boolean
  error?: ParsedError
  selectOnFocus?: boolean
  dontClear?: boolean
  type?: 'text' | 'number'
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
}>(), {type: 'text'});
const attrs = useAttrs()
const inputElement = ref<HTMLInputElement>();
let tempValue: string | number;
const debounceTime: number = 50;
const timeout = ref<ReturnType<typeof setTimeout>>();
const emit = defineEmits(['update:modelValue', 'focus', 'enter', 'keydown', 'blur']);
const whitelistedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Delete', 'Tab'];
const classes = computed(() => {

  const inheritedClasses = attrs.class as string;

  if(inheritedClasses?.length) {
    return inheritedClasses.split(' ');
  }

  return [];
  
})

watch(() => props.modelValue, () => {

  if (props.modelValue !== undefined) {
    tempValue = props.modelValue;
  }

});

onBeforeMount(() => {

  tempValue = props.modelValue as string;

})
onServerPrefetch(() => {

  tempValue = props.modelValue as string;

});

const update = (event: KeyboardEvent) => {

  const target = event?.target as HTMLInputElement;

  tempValue = target?.value;

  clearTimeout(timeout.value);

  timeout.value = setTimeout(() => {
    let valueToEmit = event ? target.value : '';
    
    // Convert to number if type is 'number' and we have a value
    if (props.type === 'number' && valueToEmit !== '') {
      const numValue = Number(valueToEmit);

      if (!isNaN(numValue)) {
        valueToEmit = numValue;
      }
    }

    if(props.outputValidation && typeof tempValue === 'string') {
      if(tempValue.match(props.outputValidation)) {
        emit('update:modelValue', valueToEmit);
      }
    } else {
      emit('update:modelValue', valueToEmit);
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
  
  // For number type, restrict input to digits, dot, and comma
  if (props.type === 'number' && 
      !(/^\d$/.test(event.key) || event.key === '.')) {
    event.preventDefault();
    return;
  }

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
  <label ref="element" class="lila-input" :class="[...classes, { error: hasError }]">
    <input ref="inputElement" :type="type" :placeholder="$translate(placeholder as string)" :disabled="disabled" :value="tempValue" @keydown="checkInput($event)" @keyup="update" @focus="focus" @blur="blur">
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

