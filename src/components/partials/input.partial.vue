<script setup lang="ts">
import type TypedEvent from '@/interfaces/Event.interface';
import type { ParsedError } from '../../libs/ActionNotice'
import {defineProps, computed, watch, ref, defineSlots, defineEmits} from 'vue'

const props = defineProps<{
    value?: string
    required?: boolean
    disabled?: boolean
    errorMessage?: boolean
    error?: ParsedError 
}>();
const inputElement = ref<HTMLInputElement | null>(null);
let tempValue: string = ''
const debounceTime:number = 500 
let timeout: ReturnType<typeof setTimeout> | null = null;
const slots = defineSlots<{
    default(): any
}>();
//
const emit = defineEmits(['update', 'focus'])


watch(() => props.value, () => {
  const activeElement = document.activeElement;
  const input = inputElement.value;

  console.log(activeElement, input);

  if(props.value !== undefined) {
    tempValue = props.value;
  }
})

const update = ($event?: KeyboardEvent) => {
  const target = $event.target as HTMLInputElement;

  tempValue = target?.value;

  clearTimeout(timeout!);

  timeout = setTimeout(() => {
    if(!$event) {
      emit('update', '' );
      return
    }
  }, debounceTime);
};
const slotUsed = computed(() => slots.default?.().length);
const errorMessage = computed(() => props.error?.keyword !== 'requires' ? props.error?.error : null)
const hasError = computed(() => !!props.error?.error)


</script>
<template>
    <label class="lila-input" :class="{ error: hasError }">
        <input
       ref="inputElement"
       type="text"
       :disabled="disabled"
       :value="tempValue"
       @keyDown="checkInput($event)"
       @keyup="update"
       @focus="focus"
       @blur="blur"

       
     />
     <!-- <input
       ref="inputElement"
       type="text"
       :placeholder="$translate(placeholder)"
       :disabled="disabled"
       :class="noHover"
       :value="tempValue"
       @keydown="checkInput($event)"
       @keyup="update"
       @focus="focus"
       @blur="blur"
     /> -->
     <lila-input-labels-partial 
     :error="hasError" 
     :required="required" 
     :disabled="disabled">
       <slot/>
     </lila-input-labels-partial>
 
     <notice-partial v-if="errorMessage" type="error">
       {{errorMessage}}
     </notice-partial>
 
   </label>
 </template>
 
 <!-- <style lang="less" scoped>
 
 
 .lila-input{
   display: grid;
   gap: 5px;
 
   &.error {
 
     input {
       border-color: @error;
     }
 
   }
 
   input{
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
 
     &:disabled {
       pointer-events: none;
 
       &:hover {
         border-bottom: 1px @color1 solid;
       }
     }
   }
 
 }
 
 </style> -->
 