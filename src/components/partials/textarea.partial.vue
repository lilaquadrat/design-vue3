<script setup lang="ts">
import { ref } from 'vue';
import type { ParsedError } from '../../libs/ActionNotice';

const props = withDefaults(defineProps<{
  disabled?: boolean;
  error?: ParsedError;
  readonly?: boolean;
  value?: string;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
  debounce?: number;
}>(), {
  debounce: 500
});
const textareaElement = ref<HTMLTextAreaElement>();
const timeoutRef = ref<any>();
const length = ref<number>(0);
const emits = defineEmits<{
  (event: 'update:modelValue', data: string): void;
}>();
const checkInput = (event: KeyboardEvent) => {

  if (!textareaElement.value) return;

  if (event.key === 'Escape') {

    textareaElement.value.blur();

  } else {
      
    updateLength();

  }

};
const updateLength = () => {

  if (!textareaElement.value) return;

  length.value = textareaElement.value.value.length;

  if (props.maxLength) {

    if (length.value > props.maxLength) {

      const textarea = textareaElement.value;

      textarea.value = textareaElement.value.value.substring(0, props.maxLength);

    }
  }

  emitChanges(textareaElement.value.value);
};
const emitChanges = (value: string) => {
  
  if (!props.debounce) {
    return emits('update:modelValue', value);
  }

  clearTimeout(timeoutRef.value);

  timeoutRef.value = setTimeout(() => {
    emits('update:modelValue', value);
  }, props.debounce);

};

</script>
<template>
  <label class="lila-textarea" tabindex="">
    <span class="textarea-placement-container">
      <textarea ref="textareaElement" :disabled="disabled" :read-only="readonly" @keyup="checkInput($event)" :placeholder="placeholder" />

      <div class="length">
        {{ length }}
        <span v-if="maxLength">/ {{ maxLength }}</span>
      </div>
    </span>

    <lila-input-labels-partial :required="required" :error="!!error" :disabled="disabled">
      <slot />
    </lila-input-labels-partial>
  </label>
</template>

<style lang="less" scoped>
.lila-textarea {
  display: grid;
  gap: 10px;

  .textarea-placement-container {
    display: grid;

    textarea {
      display: grid;

      width: 100%;
      min-height: 200px;
      padding: 5px;
      border: solid 1px @color1;

      background-color: transparent;

      color: @textColor;

      outline: none;

      font-size: @fontText;

      &::selection {
        background: @color1;
        color: @white;
      }

      .trans(border);

      &:focus {
        border: solid 1px @color1;
      }

      &:hover {
        border: solid 1px @grey;
      }

      &:disabled {
        pointer-events: none;

        &:hover {
          border: solid 1px @color1;
        }
      }
    }

    .length {
      position: absolute;
      align-self: end;
      justify-self: end;
      background-color: @grey1;
      opacity: 0.8;
      pointer-events: none;
      .multi(padding, 1);
      .multi(margin, 2);
    }
  }
}
</style>
