<script setup lang="ts">
import type SelectOption from '@/interfaces/selectOption.interface';
import type { ParsedError } from '@/libs/ActionNotice';
import { useInview } from '@/plugins/inview';
import { useResize } from '@/plugins/resize';
import { useTranslations } from '@/plugins/translations';
import { hardCopy } from '@lilaquadrat/studio/lib/esm/frontend';
import { onBeforeMount, onServerPrefetch } from 'vue';
import { computed, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    name?: string;
    description?: string;
    modelValue: string[] | string | number
    error?: ParsedError
    required?: boolean
    disabled?: boolean
    allowEmpty?: boolean
    mode?: string
    multiple?: boolean
    options: SelectOption[]
  }>(),
  {
    mode    : 'dropdown',
    multiple: true
  }
);
const { media, resized } = useResize();
const { scrolled } = useInview();
const emit = defineEmits(['update:modelValue']);
const selected = ref();
const selectedText = ref<string>('');
const calculatedOptions = ref();
const open = ref(false);
const triggerElement = ref<HTMLElement>();

watch(() => props.modelValue, (newValue, oldValue) => {
  
  if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {

    setSelected();
    updateSelectedText();

  }

});

watch(resized, () => calculateOptionsStyle())
watch(media, () => calculateOptionsStyle())
watch(scrolled, () => closeOptions())

const errorMessage = computed(() => props.error?.keyword !== 'required' ? props.error?.error : null);
const filteredOptions = computed(() => props.options);

function calculateOptionsStyle () {

  const element = triggerElement.value as HTMLElement;
  const optionsContainer = document.querySelector('.lila-overlay-background .options-container') as HTMLElement;

  if(!optionsContainer || !element) {

    calculatedOptions.value = {};
    return;

  }

  const bounds = element.getBoundingClientRect();
  let top = bounds.top + element.offsetHeight;
  const positionTop = bounds.bottom + optionsContainer.offsetHeight + 50 > window.innerHeight;

  if(positionTop) {
    top = bounds.top - 5 - optionsContainer.offsetHeight;
  }

  calculatedOptions.value = {
    top        : `${top}px`,
    left       : `${bounds.left}px`,
    'min-width': '200px',
    'max-width': `${element.offsetWidth}px`,
  };

}

const hasError = computed(() => !!props.error?.error);
const optionsStyle = computed(() => media.value === 'mobile' 
  ? {}
  : calculatedOptions.value)

onBeforeMount(() => {

  setSelected();
  updateSelectedText();

});
onServerPrefetch(() => {

  setSelected();
  updateSelectedText();

});

function setSelected () {

  if (props.modelValue === 0) {

    selected.value = 0;

  } else if(!props.modelValue) {

    selected.value = [];

  } else {

    selected.value = hardCopy(props.modelValue) || [];

  }

}

function updateSelectedText () {

  const { translate } = useTranslations();
  const textArray: string[] = [];

  if (props.multiple) {

    props.options?.forEach((value: SelectOption) => {

      if (Array.isArray(selected.value)) {

        if (selected.value?.includes(value.value)) {
          textArray.push(translate.translate(value.text));
        }

      } else {

        if (selected.value === value.value) textArray.push(translate.translate(value.text));

      }

    });

    selectedText.value = textArray.join(', ');

  } else {

    selectedText.value = translate.translate(filteredOptions.value?.find(single => single.value === selected.value)?.text as string || '');

  }

}

function isSelected (option: string | number) {

  if (Array.isArray(selected.value)) return selected.value.includes(option);
  if (typeof selected.value === 'string' || typeof selected.value === 'number') return selected.value === option;

}

// function clear () {
//   selected.value = '';
//   emitChanges();
// }

function toggle (option: SelectOption) {

  if(props.disabled) {

    open.value = false;
    return;
  }

  if (!props.multiple) {

    if (selected.value === option.value && props.allowEmpty) {
      selected.value = '';
    } else {
      selected.value = option.value;
    }

    updateSelectedText();
    emitChanges();
    open.value = false;

  } else if (selected.value.includes(option.value)) {

    option.selected = false;
    remove(option.value);

  } else {

    option.selected = true;
    add(option.value);

  }

}

function add (value: string) {

  if (!selected.value.includes(value)) {

    selected.value.push(value);
    emitChanges();

  }

  updateSelectedText();
}

function remove (value: string) {

  const index = selected.value.indexOf(value);

  if (index > -1) {

    selected.value.splice(index, 1);
    emitChanges();

  }

  updateSelectedText();
}

function emitChanges () {

  emit('update:modelValue', hardCopy(selected.value));
    
}

function closeOptions () {

  open.value = false;

}

function toggleOptions () {

  if(props.disabled) {
    open.value = false;
    return;
  }

  open.value = !open.value;

}
</script>
<template>
  <section :class="{ error: error, options: open, disabled }" class="lila-select-input label-replacement" tabindex="">
    <button ref="triggerElement" type="button" class="options-trigger" @click="toggleOptions">
      <span v-if="(selected.length === 0 || selected === 0) && placeholder" class="selected-container">{{ $translate(placeholder) }}</span>
      <span v-if="(selected.length > 0 || selected > 0)" class="selected-container">
        {{ selectedText }}
      </span>
      <lila-icons-partial type="chevron-down" size="small" />
    </button>

    <lila-client-only-partial>
      <teleport to="body">
        <lila-overlay-background-partial v-if="open" ref="options" background="none" @mounted="calculateOptionsStyle" @close="closeOptions">
          <section ref="options" class="options-container content-container" :style="optionsStyle">
            <section class="select-options">
              <button v-for="(option, index) in filteredOptions" :key="`option-index-${index}`" class="single-option-button" type="button" :title="$translate(option.text)" :value="option.value" :class="[{ selected: isSelected(option.value), hasDescription: option.description, disabled: option.disabled }]" @click="toggle(option)">
                <span v-if="!isSelected(option.value)" class="box" />
                <lila-icons-partial v-if="isSelected(option.value)" type="checked" size="small" />
                <span v-if="option.text" class="text">{{ $translate(option.text) }}</span>
                <p v-if="option.description" class="description">
                  {{ $translate(option.description) }}
                </p>
              </button>
            </section>
          </section>
        </lila-overlay-background-partial>
      </teleport>
    </lila-client-only-partial>

    <lila-input-labels-partial :error="hasError" :required="required" :disabled="disabled">
      <slot />
    </lila-input-labels-partial>

    <lila-description-partial v-if="errorMessage" :background="false" type="error">
      {{ errorMessage }}
    </lila-description-partial>

    <lila-description-partial v-if="description" class="input-description">
      {{ $translate(description) }}
    </lila-description-partial>
  </section>
</template>
<style lang="less" scoped>

.lila-select-input {
  position: relative;
  display: grid;
  gap: 5px;
  min-width: 200px;

  &.disabled {
    pointer-events: none;

  }
  .options-trigger {

    display: grid;
    grid-template-columns: 1fr 20px;

    width: 100%;
    border: 0;

    border-bottom: solid 1px @color1;

    background: none;
    font-size: @fontText;
    text-align: left;

    text-indent: 0;
    text-overflow: ellipsis;
    white-space: nowrap;

    cursor: pointer;

    span {
      padding-right: 2px;
    }
    .trans(border);
    position: relative;

    height: @buttonHeight;

    line-height: @buttonHeight;

    .selected-container {
      position: relative;
      overflow: hidden;
      width: calc(100% - 15px);

      font-size: @fontTextSmaller;
      line-height: @buttonHeight;
      text-indent: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .icon-partial {
      position: absolute;
      display: grid;
      justify-self: end;
    }

  }

  &:hover {
    .options-trigger {
      border-bottom: solid 1px @grey;
      border-color: @grey;
    }
  }

  &.error {

    .options-trigger {
      border-color: @error;
    }

    .required {
      color: @error;
    }

  }

  &.filterMode {

    .options-trigger {
      border: 0;
    }
  }

  &.options {

    .options-trigger {
      border-color: @grey;
    }
  }

  // &.select-options {

  //   .select-options, .search-partial-editor {
  //     opacity: 1;
  //     pointer-events: all;
  //   }
  // }

  // &.search {

  //   .select-options {
  //     top: 78px;
  //   }
  // }
}

.lila-overlay-background {

  .select-options {
    display: grid;
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    max-width: 100%;

    background-color: @white;

    transition: opacity .3s ease, transform .3s ease;

    @media @tablet, @desktop {
      max-height: 30vh;
    }

    @media @tablet, @desktop {
      box-shadow: 0 0 5px -3px @textColor;
    }

    .single-option-button {
      position: relative;
      display: grid;

      grid-template-columns: 45px 1fr 20px;

      gap: 5px 0;
      width: 100%;
      border: 0;
      border-bottom: solid 1px @grey1;
      background: none;

      font-size: @fontText;
      text-align: left;
      text-overflow: ellipsis;

      white-space: normal;

      cursor: pointer;

      .multi(padding, 3, 0);

      &:last-child {
        border: 0;
      }

      &:hover {
        color: @color1;
      }

      .box {
        width: 15px;
        height: 15px;
        border: solid 1px @grey;
        background-color: @white;
      }

      .box,
      .lila-icons-partial {
        display: grid;
        grid-column-start: 1;
        align-self: center;
        justify-self: center;
      }

      &.disabled {
        pointer-events: none;
        background-color: @grey1;
        color: @grey;

        .box {
          background-color: @grey1;
        }
      }

      .text, .description {
        display: grid;
        grid-column-start: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .description {
        font-size: @fontTextSmaller;
      }

      &.selected {
        color: @color1;
      }
    }
  }

  .options-container {
    display: grid;
    align-self: center;
    justify-self: center;
    width: 100%;
    position: absolute;
    
    @media @tablet, @desktop {
      max-height: 30vh;
      padding: 0;
    }

    .select-options, .search-partial-editor {
      opacity: 1;
      pointer-events: all;
    }

    .no-entries {
      .multi(padding, 2);
      font-size: @fontTextSmaller;
    }

    &.inline {

      .select-options {

        @media @tablet, @desktop {
          width: 200px;
        }
      }
    }

  }

}
</style>
