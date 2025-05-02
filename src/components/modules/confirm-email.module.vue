<script setup lang="ts">
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import type { ErrorsObject } from '@/libs/ActionNotice';
import { useInview } from '@/plugins/inview';
import { useTraceable } from '@/plugins/traceable';
import useMainStore from '@/stores/main.store';
import useUserStore from '@/stores/user.store';
import type { ResponseError } from '@lilaquadrat/interfaces';
import StudioSDK from '@lilaquadrat/sdk';
import type { AxiosError } from 'axios';
import { ref } from 'vue';

defineOptions({ inheritAttrs: false });

const { apiConfig } = useMainStore();
const userStore = useUserStore();
const { traceable } = useTraceable();
const element = ref<HTMLElement>();
const props = defineProps<ModuleBaseProps & {hint: string, additionalData: any}>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});
const state = ref<string>();
const traceId = ref<string>();
const errors = ref<ResponseError>();
const errorsObject = ref<ErrorsObject>();
const translationPre = '';
const confirmationCode = ref<string>();

function updateErrors (newErrorsObject?: ErrorsObject) {

  errorsObject.value = newErrorsObject

}

async function handleForm () {

  if(!confirmationCode.value) return;

  const sdk = new StudioSDK(apiConfig)

  try {

    await traceable(sdk.members.me.confirmEmail(confirmationCode.value), traceId);
    await userStore.updateLock();

  } catch (e) {

    const error = e as AxiosError<ResponseError>;

    errors.value = error.response?.data;

  }
}

</script>
<template>
  <article ref="element" :class="[inviewState]" class="lila-module lila-confirm-email-module">
    <form>
      <lila-fieldset-partial>
        <lila-input-partial v-model="confirmationCode" :error="errorsObject?.confirmationCode" required>
          {{ $translate('confirmationCode') }}
        </lila-input-partial>
      </lila-fieldset-partial>

      <lila-action-notice-partial :state="state" :translation-pre="translationPre" :errors="errors" @update="updateErrors">
        <lila-button-partial save :call-id="traceId" color-scheme="colorScheme1" type="submit" @click="handleForm">
          {{ $translate('confirm-email') }}
        </lila-button-partial>
      </lila-action-notice-partial>
    </form>
  </article>
</template>
<style lang="less" scoped>
.lila-confirm-email-module {
    .module;
    width: @moduleWidth_S;
}
</style>