<script setup lang="ts">
import type { ErrorsObject, ParsedError } from '@/libs/ActionNotice';
import ActionNotice from '@/libs/ActionNotice';
import { useInview } from '@/plugins/inview';
import { useResize } from '@/plugins/resize';
import type { ResponseError } from '@lilaquadrat/interfaces';
import { onBeforeMount } from 'vue';
import { computed, ref, watch } from 'vue';

const emit = defineEmits<{
  'update': [value?: ErrorsObject]
}>();
const props = defineProps<{
  errors?: ResponseError
  structureMappings: Record<string, string>
  preparsedErrors?: ErrorsObject
  translationPre?: string
}>();
const { scrolled } = useInview();
const { resized } = useResize();
const open = ref<boolean>(false);
const calculatedOptions = ref();
const parsedErrors = ref<ErrorsObject>({});
const flattenedErrors = ref<Record<string, ParsedError>>({});
const triggerElement = ref<HTMLElement>();
const errorsElement = ref<HTMLElement>();

watch(() => props.errors, () => {

  if (props.errors?.errors) {

    parsedErrors.value = ActionNotice.parse(props.errors.errors, props.translationPre, props.structureMappings);
    flattenedErrors.value = flattenErrors(parsedErrors.value, props.structureMappings);

  } else {

    ActionNotice.reset();
    parsedErrors.value = {};

  }

  calculateOptionsStyle();

})

watch(parsedErrors, () => {
  emit('update', parsedErrors.value)
});

watch(() => props.preparsedErrors, () => {

  if(props.preparsedErrors) {

    parsedErrors.value = props.preparsedErrors;

  }

})
watch(errorsElement, () => {

  if(errorsElement.value) {

    calculateOptionsStyle();

  }

})

watch([() => resized, () => scrolled], () => closeOptions())

function flattenErrors (errors: ErrorsObject, structureMappings: Record<string, string> | undefined) {

  const flattenedErrors: Record<string, ParsedError> = {};

  Object.keys(errors).forEach((single) => {

    if (errors[single].translatedPath) {

      const mappedPath = structureMappings?.[errors[single].translatedPath.path as string] || errors[single].translatedPath.path;
      
      flattenedErrors[single] = {...errors[single], translatedPath: {path: mappedPath, values: errors[single].translatedPath.values}} as ParsedError;
      
    } else {

      Object.values(errors[single]).forEach((child, index) => {

        Object.keys(child).forEach((childKey) => {

          flattenedErrors[`${single}-element-${index}-${childKey}`] = {
            ...child[childKey],
            parentPath: {
              path  : props.translationPre ? `${props.translationPre}-${single}-parent` : `${single}-parent`,
              values: [index + 1],
            },
          };

        });

      });

    }

  });

  return flattenedErrors;

}

onBeforeMount(() => {

  if (props.preparsedErrors) {

    parsedErrors.value = props.preparsedErrors;

  }

});

const hasErrors = computed(() => !!props.errors?.errors || !!props.preparsedErrors);

function closeOptions () {

  open.value = false;

}

function toggleErrors () {

  open.value = !open.value;

}

function calculateOptionsStyle () {
  
  if (!triggerElement.value || !errorsElement.value) return;
  
  const optionsContainer = errorsElement.value;
  const element = triggerElement.value;
  const bounds = element.getBoundingClientRect();
  let top = bounds.top + element.offsetHeight;
  const left = bounds.left - optionsContainer.offsetWidth + element.offsetWidth;

  top = bounds.top - 5 - optionsContainer.offsetHeight;

  calculatedOptions.value = {
    top : `${top}px`,
    left: `${left}px`,
  };

}

const optionsStyle = computed(() => calculatedOptions.value);

</script>
<template>
  <section class="action-notice-partial">
    <lila-overlay-background-partial v-if="open" background="none" @close="closeOptions">
      <ul ref="errorsElement" class="error-list" :style="optionsStyle">
        <li v-for="(error, index) in flattenedErrors" :key="`parsedErrors-${index}`">
          <template v-if="error.translatedPath?.path">
            <template v-if="error.translatedPath.path !== 'main'">
              <template v-if="error.parentPath?.path">
                {{ $translate(error.parentPath.path, error.parentPath.values as string[]) }}
              </template>
              {{ $translate(error.translatedPath.path, error.translatedPath.values as string[]) }}
            </template>
          </template>
          {{ error.error }}
        </li>
      </ul>
    </lila-overlay-background-partial>

    <section ref="triggerElement" class="buttons-container">
      <div class="slot-container">
        <slot />
      </div>
      <lila-button-partial v-if="hasErrors" color-scheme="error" icon="warning" type="button" @click="toggleErrors" />
    </section>
  </section>
</template>
<style lang="less" scoped>

.action-notice-partial {
  position: relative;
  display: grid;

  .buttons-container, .slot-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
    justify-content: end;
  }

}

.error-list {
  position: absolute;
  display: grid;
  overflow-y: auto;

  max-height: 30vh;
  background-color: @grey2;
  box-shadow: 0 0 5px 1px @shadow;

  white-space: nowrap;

  .multi(padding, 4);

  li {
    .font-bold;
  }
}
</style>
