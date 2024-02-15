<script setup lang="ts">
import { auth } from '@/plugins/auth';
import useMainStore from '@/stores/main.store';
import useUserStore from '@/stores/user.store';
import StudioSDK from '@lilaquadrat/sdk';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const mainStore = useMainStore();
const userStore = useUserStore();
const router = useRouter(); 
const error = ref<boolean>(false);
const hint = ref<string>();

onBeforeMount(async () => {

  console.log(window.location.hash);

  let loginResult;

  try {

    loginResult = await auth.handleCallback();
    
  } catch (e: any) {

    const message = e.message;
    
    console.log(e, message);

    if(message === 'EMAIL_VERIFICATION_REQUIRED') {

      hint.value = 'email-verification'

    }

    error.value = true;
    return;

  }

  const token = await auth.getTokenContent();

  console.log(token, loginResult?.appState?.customerId);

  const sdk = new StudioSDK(mainStore.apiConfig);
  let isConnected = (await sdk.apps.me.isConnected()).status === 200;

  if(!token?.email_verified) {

    console.error('LOCK THE USE FOR EMAIL VERIFICATION');
    userStore.locked = 'email-verified';

  } else if(userStore.locked === 'email-verified') {

    userStore.locked = undefined;
    
  }

  /**
  * check if a customerId is given and user is not connected
  */
  if(loginResult?.appState?.customerId && !isConnected) {

    console.log('connect user', loginResult?.appState?.customerId, auth.token.value);

    try {

      await sdk.apps.me.connect(loginResult?.appState?.customerId);
      isConnected = true;
      
    } catch (e) {

      console.error(e);
      console.error('LOCK THE USE FOR MISSING CONNECTION');
      if(!userStore.locked) userStore.locked = 'user-connect';
      
    }
    
  } else if(!loginResult?.appState?.customerId && !isConnected) {

    console.error('LOCK THE USE FOR MISSING CONNECTION');
    if(!userStore.locked) userStore.locked = 'user-connect';

  } 

  router.replace({name: 'members'});

})

</script>
<template>
  <lila-error-partial v-if="error" :status="400" :hint="hint" type="members" />
</template>