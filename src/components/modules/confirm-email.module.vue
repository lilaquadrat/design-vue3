<script setup lang="ts">
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import type { ErrorsObject } from '@/libs/ActionNotice';
import { useInview } from '@/plugins/inview';
import { useTraceable } from '@/plugins/traceable';
import useMainStore from '@/stores/main.store';
import useUserStore from '@/stores/user.store';
import type { ResponseError } from '@lilaquadrat/interfaces';
import StudioSDK from '@lilaquadrat/sdk';
import { ref } from 'vue';

defineOptions({ inheritAttrs: false });

const { apiConfig } = useMainStore();
const userStore = useUserStore();
const { traceable } = useTraceable();
const element = ref<HTMLElement>();
const props = defineProps<ModuleBaseProps & {hint: string, hintData: any}>();
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

  console.log(confirmationCode.value, userStore.locked);
  if(!confirmationCode.value) return;

  const sdk = new StudioSDK(apiConfig)

  try {

    await traceable(sdk.members.me.confirmEmail(confirmationCode.value), traceId);
    await userStore.updateLock();

  } catch (error) {

    errors.value = error.response?.data;
    
  }

}

</script>
<template>
    <article ref="element" :class="[inviewState]" class="lila-module lila-connect-user-module">

        <form>
            <lila-fieldset-partial>
                <lila-input-partial v-model="confirmationCode" :error="errorsObject?.confirmationCode" required>{{ $translate('confirmationCode') }}</lila-input-partial>
            </lila-fieldset-partial>

            <lila-action-notice-partial :state="state" :translation-pre="translationPre" :errors="errors" @update="updateErrors">
                <lila-button-partial save :callId="traceId" colorScheme="colorScheme1" type="submit" @click="handleForm">{{$translate('confirm-email')}}</lila-button-partial>
            </lila-action-notice-partial>
        </form>
    </article>
</template>
<style lang="less" scoped>
.lila-connect-user-module {
    .module;
    width: @moduleWidth_S;
}
</style>