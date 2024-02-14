<script setup lang="ts">
import { auth } from '@/plugins/auth';
import { onBeforeMount, ref } from 'vue';

const error = ref<boolean>(false);
const hint = ref<string>();

onBeforeMount(async () => {

  console.log(window.location.hash);

  try {

    await auth.handleCallback();
    
  } catch (e: any) {

    const message = e.message;
    
    console.log(e, message);

    if(message === 'EMAIL_VERIFICATION_REQUIRED') {

      hint.value = 'email-verification'

    }

    error.value = true;

  }

})

</script>
<template>
  <lila-error-partial v-if="error" :status="400" :hint="hint" type="members" />
</template>