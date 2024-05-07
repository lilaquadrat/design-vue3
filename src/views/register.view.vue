<script setup lang="ts">
import {auth} from '@/plugins/auth';
import useMainStore from '@/stores/main.store';
import useUserStore from '@/stores/user.store';
import { prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import { computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const store = useMainStore();

onBeforeMount(() => {

  if(route.query.customerId) {

    userStore.setCustomer({_id: route.query.customerId as string});

  }

  if(route.query.emailConfirmationCode) {

    userStore.emailConfirmationCode = route.query.emailConfirmationCode as string;

  }

  if(!auth.isAuth.value) {

    auth.triggerRegister(userStore.customer?._id, userStore.emailConfirmationCode);

  } else {

    router.push({name: 'members'})

  }
  
})

const contentMerged = computed(() => {

  const data = store.staticData?.redirect;

  if(data) return prepareContent(data);
  return prepareContent({})

}); 

</script>
<template>
  <section class="register-view">
    <lila-content-module v-if="contentMerged" :content="contentMerged" />
  </section>
</template>
<style lang="less" scoped>
  .register-view {
    display: grid;
    align-content: center;
    justify-content: center;

    height: 80vh;
  }
</style>