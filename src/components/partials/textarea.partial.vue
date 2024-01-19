<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue';
import { type ParsedError } from '../../libs/ActionNotice';


const props = withDefaults(defineProps<{
  disabled?: boolean
  error: ParsedError
  readonly: boolean
  value: string
  maxLength: number
  placeholder: string
  required: boolean
  slots: boolean


}>(), 
{});
let $refs: {
  textarea: HTMLTextAreaElement
}
const length: number = 0;
const timeout = ref<any>
const emit = defineEmits<{(e: string): void}>();
const slotUsed = computed(() => {

})

</script>
<template>
  <label class="lila-textarea" tabindex="">
    <!-- <span class="textarea-placement-container">
      <textarea ref="textarea" :disabled="disabled" :read-only="readonly" @input="input($event.target.value)" @keyup="checkInput($event)" :placeholder="placeholder" />
      <div class="length">
        {{ length }}
        <span v-if="maxLength">/ {{ maxLength }}</span>
      </div>
    </span>

    <lila-input-labels-partial :required="required" :error="error" :disabled="disabled"><slot/></lila-input-labels-partial> -->

  </label>
</template>

<!-- <style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

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
      opacity: .8;
      pointer-events: none;
      .multi(padding, 1);

      .multi(margin, 2);
    }
  }

}
</style> -->
