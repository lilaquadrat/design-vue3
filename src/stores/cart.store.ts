import { ref } from 'vue'
import { defineStore } from 'pinia'
import PaymentProviderFactory from '@/functions/PaymenyProviderFactory';
import useMainStore from './main.store';
import type { Agreement } from '@lilaquadrat/interfaces';

export const useCartStore = defineStore('cart', () => {
  
  const products = ref<any[]>([]);
  const costSummary = ref<number>(0);
  const itemsQuantity = ref<number>(0);
  const mainStore = useMainStore();
  const paymentProvider = PaymentProviderFactory(mainStore.config?.payment?.type as 'internal' | 'shopify' | 'stripe', mainStore.config?.payment?.options);
  const cartCache = ref();

  async function getCart (attributes?: Record<string, string>) {

    if(cartCache.value) return Promise.resolve(cartCache.value);
    if(!attributes) return Promise.reject('ATTRIBUTES_MISSING');

    const list = attributes.list;

    if(!list) return Promise.reject('NO_LIST_GIVEN');

    const cartId = `lila-cart-${list}`;
    const storedCart = localStorage.getItem(cartId);

    if(storedCart) {

      try {
        
        cartCache.value = JSON.parse(storedCart);
        products.value = await paymentProvider.getCartWithProducts(cartCache.value.id);

      } catch (error) {
        
        console.error(error);
        localStorage.removeItem(cartId);
        cartCache.value = undefined;
        await getCart(attributes);

      }

      updateSummary();
      
    } else {

      const newCart = await paymentProvider.getCart(attributes);

      localStorage.setItem(cartId, JSON.stringify(newCart));

      cartCache.value = newCart;
      
    }

    return Promise.resolve(cartCache.value);

  }

  function getFinishedCart (cartId: string) {

    return paymentProvider.getFinishedCart(cartId);

  }

  function importCart (cart: any[]) {

    console.log(cart);

    products.value = cart;
    updateSummary();

  }

  function updateSummary () {

    let costs = 0;
    let quantity = 0;

    products.value.forEach((single) => {

      costs += ((single.price.amount || 0) / 100) * single.quantity;
      quantity += single.quantity;

    });

    costSummary.value = Math.round(costs * 100) / 100
    itemsQuantity.value = quantity;

  }

  function updateAgreements (acceptedAgreements: Agreement[]) {

    const attributes: Record<string, string> = {...cartCache.value.attributes};

    acceptedAgreements.forEach((single, index) => {
      
      attributes[`agreement_${index}`] = single.contentId;
      
    });

    console.log(acceptedAgreements, cartCache.value, attributes);
    return paymentProvider.updateCartAttributes(cartCache.value.id, attributes);

  }

  function getProductInCart (productId: string) {

    if(!productId) return null;
    return products.value.find((single) => single.id === productId);

  }

  async function addProduct (productId: string) {

    const product = await paymentProvider.getProduct(productId);
    const cart = await getCart();
    const existingProduct = getProductInCart(product.id);

    if(!existingProduct) {

      const updatedProduct = await paymentProvider.addToCart(cart.id, product, 1);

      products.value.push({...updatedProduct, quantity: 1});
      updateSummary();

    } else {

      console.log('update instead of add', product.id, existingProduct.quantity);
      updateQuantity(product.id, existingProduct.quantity + 1);

    }

  }

  async function updateQuantity (productId: string, quantity: number) {

    const existingProduct = getProductInCart(productId);
    const cart = await getCart();

    paymentProvider.updateQuantity(cart.id, existingProduct, quantity)

    existingProduct.quantity = quantity;
    updateSummary();

  }

  async function removeProduct (productId: string) {

    const existingProduct = getProductInCart(productId);
    const cart = await getCart();

    await paymentProvider.removeFromCart(cart.id, existingProduct);

    const index = products.value.findIndex((single) => single.id === productId);

    products.value.splice(index, 1);
    updateSummary();

  }

  function finalize () {

    return paymentProvider.finalize(cartCache.value.id);

  }

  return { 
    addProduct, 
    updateQuantity,
    removeProduct,
    updateAgreements,
    importCart,
    products,
    getProductInCart,
    costSummary,
    itemsQuantity,
    getCart,
    finalize,
    getFinishedCart,
    cart: cartCache
  }

})

export default useCartStore;