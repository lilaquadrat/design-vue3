<script setup lang="ts">
import type AppState from '@/interfaces/AppState.interface';
import { auth } from '@/plugins/auth';
import useMainStore from '@/stores/main.store';
import useUserStore from '@/stores/user.store';
import type { RedirectLoginResult } from '@auth0/auth0-spa-js';
import StudioSDK from '@lilaquadrat/sdk';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const mainStore = useMainStore();
const userStore = useUserStore();
const router = useRouter(); 
const error = ref<boolean>(false);
const hint = ref<string>();

onBeforeMount(async () => {

  let loginResult: RedirectLoginResult<AppState>;

  // Attempt to handle the authentication callback.
  try {

    loginResult = await auth.handleCallback();
  
  } catch (e: any) { 

    console.error(e);
    error.value = true;
    return;

  }

  await userStore.updateLock();
  
  console.log(userStore.locked, loginResult);
  
  const sdk = new StudioSDK(mainStore.apiConfig);

  if(userStore.locked === 'user-connect' && loginResult?.appState?.customerId) {

    try {

      // Attempt to connect the user with the provided customerId.
      await sdk.members.me.connect(loginResult?.appState?.customerId);
      await userStore.updateLock();

    } catch (e) {

      console.error(e);
      console.error('CONNECT_ACCOUNT_TO_CUSTOMER_FAILED');
    
    }

  }

  if(!userStore.userData?.emailConfirmed && loginResult?.appState?.emailConfirmationCode) {

    try {

      // Attempt to confirm the email address with the provided code
      await sdk.members.me.confirmEmail(loginResult?.appState?.emailConfirmationCode)
      await userStore.updateLock();

    } catch (e) {

      console.error(e);
      console.error('EMAIL_CONFIRMATION_FAILED');
    
    }

  }

  router.replace({name: 'members'});

})

</script>
<template>
  <lila-error-partial v-if="error" :status="400" :hint="hint" type="members" />
</template>