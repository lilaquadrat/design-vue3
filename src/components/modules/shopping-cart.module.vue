<script setup lang="ts">
import type OverlayBackgroundExposure from '@/interfaces/OverlayBackgroundExposure.interface';
import useCartStore from '@/stores/cart.store';
import useMainStore from '@/stores/main.store';
import type { Agreement, BasicData, GenericDataDistributed, List } from '@lilaquadrat/interfaces';
import { computed, onBeforeMount, ref, watch } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    genericData: GenericDataDistributed
    editor?: {modes: string[]}
}>();
const viewMode = ref<'compact' | 'full'>('compact');
const cartStore = useCartStore();
let quantityTimeout: NodeJS.Timeout;
const quantityTimeoutTime = 1000;
const showContent = ref<boolean>(false);
const overlay = ref<OverlayBackgroundExposure>();
const animate = ref<boolean>(false);
const showAgreements = ref<boolean>(false);
const mainStore = useMainStore();
const agreementsExtended = ref<(Agreement & { value: boolean })[]>([]);
const showSuccess = computed(() => props.editor?.modes?.includes('success'));
const list = computed<BasicData<List> | undefined>(() => {

  const firstList = props.genericData?.lists[0];

  return firstList 
    ? props.genericData.data[firstList.toString()] as BasicData<List>
    : undefined;

});
const agreementsAccepted = computed(() => {

  let accepted = true;

  agreementsExtended.value.forEach((single) => {

    if(single.required && !single.value) accepted = false;

  });

  return accepted;

});

watch(() => props.genericData, async () => {

  console.log('props changed');

  await getCart();
  updateAgreements();

});

watch(() => cartStore.itemsQuantity, () => {

  animate.value = true;
  setTimeout(() => {
    animate.value = false;
  }, 1000);

})

onBeforeMount(async () => {

  console.log(props.genericData);
  await getCart();
  updateAgreements();

})

/**
 * adds errors to agreements if given
 */
function updateAgreements () {

  const agreements: (Agreement & { value: boolean })[] = [];

  list.value?.agreements.forEach((single) => {

    agreements.push({
      ...single,
      value: false,
    })

  });

  agreementsExtended.value = agreements
    
}

function toggleAgreements () {

  showAgreements.value = !showAgreements.value;

}

async function getCart () {

  if(!list.value || !list.value._id) return;

  await cartStore.getCart([
    {key: 'company', value: mainStore.apiConfig.company as string},
    {key: 'project', value: mainStore.apiConfig.project as string},
    {key: 'list', value: list.value._id?.toString()},
  ]);
  
}

function switchMode () {

  console.log('switchMode');

  if (viewMode.value === 'compact') {

    viewMode.value = 'full';
    return;

  }

  if (viewMode.value === 'full') {

    viewMode.value = 'compact';
    showContent.value = false;
    showAgreements.value = false;
    return;

  }

}

function updateQuantity (productId: string, type: 'decrease' | 'increase') {

  const product = cartStore.getProductInCart(productId);

  if (type === 'decrease') {

    if (product.quantity > 0) {
      product.quantity--;
    }

  } else {

    product.quantity++

  }

  clearTimeout(quantityTimeout);
  quantityTimeout = setTimeout(() => {

    if (product.quantity < 1) {
      console.log('remove', product.quantity);

      cartStore.removeProduct(productId);

    } else {
      cartStore.updateQuantity(productId, product.quantity);
      console.log('dec', product.quantity);

    }

  }, quantityTimeoutTime)

}

function close () {

  return overlay.value?.animationAwareClose();

}

async function updateAgreementsAndCheckout (event: MouseEvent) {

  event.preventDefault();
  await cartStore.updateAgreements(agreementsExtended.value.filter((single) => single.value));
  window.location.href = cartStore.cart.checkoutUrl;
  console.log('updateAgreements');

}

</script>
<template>
  <article class="lila-shopping-cart-module" :class="[viewMode]">

    <lila-overlay-background-partial ref="overlay" v-if="viewMode === 'full'" transition background="none"
      @close="switchMode" @mounted="showContent = true">
      <article class="lila-shopping-cart-full" :class="{showAgreements}">
        <header class="cart-header">
          <h1>
            {{ $translate('shopping-cart-title') }}
          </h1>
          <lila-button-partial color-scheme="colorScheme2" icon="close" @click="close" />
        </header>
        <section v-if="showAgreements" class="agreements">

          <lila-agreement-partial v-for="(single, index) in agreementsExtended" :key="`agreement-${index}`" 
            v-model="single.value" 
            compact
            :required="single.required" 
            :predefined="single.predefined"
            :contentId="single.contentId">
            {{$translate(single.text)}}
          </lila-agreement-partial>

        </section>
        <section v-if="!showAgreements" class="products-container">
          <p v-if="!cartStore.products.length" class="no-products-note">{{ $translate('shopping-cart-no-products') }} </p>
          <article class="product" v-for="(product, index) in cartStore.products" :class="{ hasImage: product.image }"
            :key="`single-product-${index}`">

            <lila-picture-partial v-if="product.image" fit :src="product.image" />

            <header>

              <h1>{{ product.name }} - <span class="price">{{ $currency(product.price) }}</span></h1>

              <p v-if="product.description">{{ product.description }}</p>

              <div class="quantity-controls">
                <lila-button-partial color-scheme="white"
                  @click="updateQuantity(product.id, 'decrease')">-</lila-button-partial>
                <span class="quantity">{{ product.quantity }}</span>
                <lila-button-partial color-scheme="white"
                  @click="updateQuantity(product.id, 'increase')">+</lila-button-partial>
              </div>

            </header>

          </article>
        </section>
        <section class="costs-summary">
          <span class="costs-summary-text">{{ $translate('shopping-cart-cost-summary') }}
            {{ $translateWithDiff('shopping-cart-cost-summary-quantity', cartStore.itemsQuantity) }}</span>
          <span class="costs-summary-amount">{{ $currency(cartStore.costSummary) }}</span>
        </section>
        <footer class="cart-footer">

          <lila-button-group-partial>
            <lila-button-partial v-if="!showAgreements" icon="arrow-right-long" icon-size="medium" @click="toggleAgreements">{{ $translate('shopping-cart-checkout') }} </lila-button-partial>
            <lila-button-partial v-if="showAgreements" color-scheme="transparent" @click="toggleAgreements">
              {{ $translate('shopping-cart-show-items') }} 
            </lila-button-partial>
            <lila-action-partial v-if="showAgreements" call-to-action icon="arrow-right-long" :disabled="!agreementsAccepted" :link="cartStore.cart.checkoutUrl" @click="updateAgreementsAndCheckout">
              {{ $translate('shopping-cart-checkout') }} 
            </lila-action-partial>
          </lila-button-group-partial>

        </footer>
      </article>
    </lila-overlay-background-partial>

    <button class="cart-button" type="button" :class="{ animate }" @click="switchMode">
      <lila-icons-partial size="larger" type="cart" />
      <span class="items-amount">{{ cartStore.itemsQuantity }}</span>
    </button>

    <lila-content-container-partial v-if="showSuccess && list?.content?.paid" auto-visible :internalId="list?.content?.paid" overlay>{{$translate('show content')}}</lila-content-container-partial>

  </article>
</template>
<style lang="less" scoped>
.lila-shopping-cart-module {
  position: fixed;

  top: 20%;
  right: 0;

  .cart-button {
    display: grid;
    width: 40px;
    height: 40px;

    position: relative;

    background-color: @white;
    cursor: pointer;
    border: 0;

    align-items: center;
    justify-items: center;

    .basicHover;

    .items-amount {
      position: absolute;
      color: @white;
      background-color: @color1;
      border-radius: 50%;

      height: 15px;
      width: 15px;
      line-height: 15px;

      font-size: 10px;

      top: 5px;
      right: 5px;
    }

    &.animate {
      animation: slide .5s ease-out forwards;
    }
  }

  @keyframes slide {

    0%,
    100% {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(10deg);
    }

    75% {
      transform: rotate(-10deg);
    }
  }

}

.lila-shopping-cart-full {
  display: grid;
  gap: 20px;

  position: fixed;
  box-shadow: 0 0 5px @grey;
  border: solid 1px @grey2;
  background-color: @grey2;
  grid-template-rows: max-content 1fr max-content max-content;

  right: 0;
  top: 0;

  height: 100%;
  width: calc(100% - 40px);

  @media @tablet, @desktop {
    width: 400px;
  }

  &.fade-enter-active,
  &.fade-leave-active {
    transition: transform .3s ease;
  }

  &.fade-enter-from,
  &.fade-leave-to {
    transform: translateX(100%);
  }

  .cart-header {
    background-color: @grey2;
    display: grid;
    grid-template-columns: 1fr 35px;
    .multi(padding, 2, 2, 0, 4);

    h1 {
      .font-head;
      text-transform: uppercase;
      color: @color1;
      display: grid;
      gap: 5px;
      line-height: 35px;
      grid-template-columns: max-content 35px;
    }
  }

  .cart-footer {
    display: grid;
    gap: 40px;
    overflow: hidden;
    .multi(padding, 2, 4, 4, 2);
    
    a {
      text-align: center;
    }

  }
      
  .agreements {
    .multi(padding, 0, 4);
    overflow-y: auto;
    align-content: start;
    display: grid;
    gap: 20px;
  }

  .products-container {
    display: grid;
    align-content: start;
    gap: 10px;
    .multi(padding, 0, 2);
    overflow-y: auto;

    .no-products-note {
      .multi(padding, 2);
      text-align: center;
    }
    
    .product {
      display: grid;
      .multi(padding, 4);
      align-items: start;
      background-color: @white;

      header {
        display: grid;
        grid-template-columns: 1fr;
        align-content: start;
        gap: 20px;

        h1,
        .price {
          .font-bold;
          color: @color1;
          font-size: @headline_XS;
          line-height: @headlineLineHeight_XS;
        }

      }

      &.hasImage {
        grid-template-columns: 1fr 2fr;
        gap: 30px;
      }

      .quantity-controls {
        display: grid;
        grid-template-columns: repeat(3, 35px);
        align-items: center;

        .quantity {
          text-align: center;
        }
      }

      .price {
        .font-bold;
      }
    }
  }

  .costs-summary {

    border-top: solid @grey1 1px;
    border-bottom: solid @grey1 1px;

    .multi(padding, 2, 6);

    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 10px;

    .costs-summary-amount {
      justify-self: end;
      .font-bold;
      font-size: @headline_XS;
      color: @color1;
    }
  }

  &.showAgreements {
    // grid-template-rows: max-content max-content max-content;

    .cart-footer {
      // align-self: end;
      // grid-template-rows: minmax(40px, auto) max-content;
    }
  }

}
</style>