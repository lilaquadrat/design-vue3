import type PaymentProvider from '@/interfaces/PaymentProvider.interface';
import useCartStore from '@/stores/cart.store';
import useMainStore from '@/stores/main.store';
import StudioSDK from '@lilaquadrat/sdk';

export default class StripePaymentProvider implements PaymentProvider {

  async getCart (attributes: Record<string, string>): Promise<{ id: string; attributes: Record<string, string> }> {

    const { apiConfig } = useMainStore();
    const sdk = new StudioSDK(apiConfig)

    console.log('StripePaymentProvider.getCart', attributes);

    const cart = await sdk.public.carts.create({attributes});

    return { id: cart.data._id, attributes: attributes || {} };

  }

  async updateCartAttributes (cartId: string, attributes?: Record<string, string>): Promise<any> {
    
    const { apiConfig } = useMainStore();
    const sdk = new StudioSDK(apiConfig)
    const { products } = useCartStore();
    const updateCart: {items?: {_id: string, quantity: number}[], attributes: Record<string, string>} = {
      items     : [],
      attributes: {}
    };

    products.forEach((item: any) => {

      updateCart.items?.push({_id: item._id, quantity: item.quantity});

    });

    if(attributes) {

      Object.keys(attributes).forEach((attribute) => {
        updateCart.attributes[attribute] = attributes[attribute];
      })

    }

    const updatedCart = await sdk.public.carts.update(cartId, updateCart);

    console.log('StripePaymentProvider.updateCartAttributes', updateCart);
    return Promise.resolve(updatedCart);

  }

  async getCartWithProducts (cartId: string) {

    const { apiConfig } = useMainStore();
    const sdk = new StudioSDK(apiConfig)

    console.log('StripePaymentProvider.getCartWithProducts');

    const cart = await sdk.public.carts.getById(cartId);

    if(!cart.data) throw new Error('NO_CART_FOUND');

    return cart.data.items || [];
  }

  async getProduct (productId: string): Promise<any> {

    console.log('StripePaymentProvider.getProduct', productId);

    const { apiConfig } = useMainStore();
    const sdk = new StudioSDK(apiConfig)
    const product = await sdk.public.carts.getProduct(productId);

    return product.data;
  }

  async addToCart (cartId: string, product: any, amount: number): Promise<any> {

    const { apiConfig } = useMainStore();
    const sdk = new StudioSDK(apiConfig)
    const { products } = useCartStore();
    const updateCart: {items?: {_id: string, quantity: number}[]} = {
      items: [],
    };

    console.log('StripePaymentProvider.addToCart', cartId, product, amount);

    const itemInCart = products.find((item: any) => item._id === product._id);

    if(itemInCart) {

      itemInCart.quantity = itemInCart.quantity + amount;

    } else {

      updateCart.items?.push({
        _id     : product._id,
        quantity: amount
      });

    }

    products.forEach((item: any) => {

      updateCart.items?.push({_id: item._id, quantity: item.quantity});

    });

    const updatedCart = await sdk.public.carts.update(cartId, updateCart);
    const addedItem = updatedCart.data.items.find((item: any) => item.id === product.id);

    return addedItem

  }

  async removeFromCart (cartId: string, product: any): Promise<any> {

    const { apiConfig } = useMainStore();
    const sdk = new StudioSDK(apiConfig)
    const { products } = useCartStore();
    const updateCart: {items?: {_id: string, quantity: number}[]} = {
      items: []
    };

    products.forEach((item) => {

      if(item._id === product._id) return;
      updateCart.items?.push({_id: item._id, quantity: item.quantity});

    });

    if(updateCart.items?.length === 0) {
      delete updateCart.items;
    }

    await sdk.public.carts.update(cartId, updateCart);

  }

  async updateQuantity (cartId: string, cartProduct: any, amount: number): Promise<any> {

    const { apiConfig } = useMainStore();
    const sdk = new StudioSDK(apiConfig)
    const { products } = useCartStore();
    const updateCart: {items?: {_id: string, quantity: number}[]} = {
      items: []
    };
    const itemInCart = products.find((item) => item._id === cartProduct._id);

    itemInCart.quantity = amount;

    products.forEach((item) => {
      updateCart.items?.push({_id: item._id, quantity: item.quantity});
    });

    await sdk.public.carts.update(cartId, updateCart);

  }

  async finalize (cartId: string): Promise<{checkoutUrl: string}> {

    const { apiConfig } = useMainStore();
    const sdk = new StudioSDK(apiConfig)
    const repsonse = await sdk.public.carts.finalize(cartId);

    return repsonse.data;
  }

  async getFinishedCart (cartId: string): Promise<any> {

    const { apiConfig } = useMainStore();
    const sdk = new StudioSDK(apiConfig)
    const cart = await sdk.public.carts.getFinishedById(cartId);

    if(!cart.data) throw new Error('NO_CART_FOUND');

    return cart.data;

  }

}
