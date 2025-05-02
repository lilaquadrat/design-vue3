<script setup lang="ts">
import type LinkListWithTitle from '@/interfaces/LinkListWithTitle.interface';
import type ListWithTitle from '@/interfaces/ListWithTitle.interface';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { useInview } from '@/plugins/inview';
import useCartStore from '@/stores/cart.store';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({ inheritAttrs: false });

const route = useRoute();
const props = defineProps<ModuleBaseProps & {
  headline?: string
  subline?: string
  intro?: string
  text?: string[]
  links?: LinkListWithTitle
  list?: ListWithTitle
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});
const cart = ref();
const error = ref(false);

onBeforeMount(async () => {

  const cartId = route.query.cartId as string;
  const cartStore = useCartStore();
  let finishedCart;

  if(!cartId) {
    error.value = true;
    return;
  }

  try {
    
    finishedCart = await cartStore.getFinishedCart(cartId);

  } catch (e) {

    console.error('CART_NOT_FOUND', e);
    error.value = true;
    return;
    
  }

  cart.value = finishedCart;

  console.log(cartId);

});

const invoice = computed(() => cart.value?.payment?.additionalData?.invoiceUrl);

</script>
<template>
  <article :id="props.index?.anchor || props.id" ref="element" class="lila-order-success-module lila-module" :class="[inviewState, variant, {sub}]">
    <template v-if="error">
      <lila-textblock-partial
        :variant="['headline']" 
        :subline="$translate('ORDER_ERROR_TITLE')"
        :text="[$translate('ORDER_ERROR_DESCRIPTION')]"
      />
    </template>
    <template v-else>
      <lila-qrcode-partial v-if="cart" :content="cart.payment._id" />
      <section v-if="cart">
        <template v-if="invoice">
          <lila-link-partial :variant="['callToAction']" :link="invoice" target="_blank">
            {{ $translate('INVOICE_DOWNLOAD') }}
          </lila-link-partial>
        </template>
        <template v-if="!invoice">
          <lila-textblock-partial
            :variant="['headline']" 
            :subline="$translate('INVOICE_NOT_YET_READY_TITLE')"
            :text="[$translate('INVOICE_NOT_YET_READY_DESCRIPTION')]"
          />
        </template>
      </section>
    </template>
  </article>
</template>

<style lang="less" scoped>
.lila-order-success-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  @media print {
    margin: 20mm 0;
  }

  text-align: center;

}
</style>