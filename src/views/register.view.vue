<script setup lang="ts">
import {auth} from '@/plugins/auth';
import useUserStore from '@/stores/user.store';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userStore = useUserStore();

onBeforeMount(() => {
  console.log('before mount', route.query);

  if(route.query.customerId) {

    userStore.setCustomer({_id: route.query.customerId as string});

  }

  if(route.query.emailConfirmationCode) {

    userStore.emailConfirmationCode = route.query.emailConfirmationCode as string;

  }
  
})

function login () {
  
  auth.triggerLogin(userStore.customer?._id, userStore.emailConfirmationCode);

}

</script>
<template>register <button @click="login">LOGIN</button></template>