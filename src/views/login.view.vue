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
  let isConnected = false;

  // Attempt to handle the authentication callback.
  try {

    loginResult = await auth.handleCallback();
  
  } catch (e: any) { 

    console.error(e);
    error.value = true;
    return;

  }

  // Attempt to retrieve the token content, which includes the user's email verification status.
  const token = await auth.getTokenContent();

  // Check if the email associated with the token is not verified.
  if(!token?.email_verified) {

    console.error('LOCK THE USE FOR EMAIL VERIFICATION');
    // Lock the user account for email verification.
    userStore.locked = 'email-verified';

  } else if(userStore.locked === 'email-verified') { // If the user was previously locked for email verification and now is verified,

    // Unlock the user account.
    userStore.locked = undefined;
  
  }

  const sdk = new StudioSDK(mainStore.apiConfig);

  try {
  
    // Check the connection status and compare the response status.
    isConnected = (await sdk.members.me.isConnected()).status === 200;

  } catch (error) {

    console.error(error);
    isConnected = false;
  
  }

  // Check if a customerId is provided in the login result and the user is not connected.
  if(loginResult?.appState?.customerId && !isConnected) {

    try {

      // Attempt to connect the user with the provided customerId.
      await sdk.members.me.connect(loginResult?.appState?.customerId);
      isConnected = true;
    
    } catch (e) {

      console.error(e);
      console.error('LOCK THE USE FOR MISSING CONNECTION');
      // Lock the user account for missing connection if not already locked.
      if(!userStore.locked) userStore.locked = 'user-connect';
    
    }
  
  } else if(!loginResult?.appState?.customerId && !isConnected) { // If no customerId is provided and the user is not connected,

    console.error('LOCK THE USE FOR MISSING CONNECTION');
    // Lock the user account for missing connection if not already locked.
    if(!userStore.locked) userStore.locked = 'user-connect';

  } 

  router.replace({name: 'members'});

})

</script>
<template>
  <lila-error-partial v-if="error" :status="400" :hint="hint" type="members" />
</template>