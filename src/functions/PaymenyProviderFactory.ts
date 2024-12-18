import ShopifyGraphQLAPI from './shopify.provider';
import type PaymentProvider from '@/interfaces/PaymentProvider.interface';

export default function PaymentProviderFactory (type: 'internal' | 'shopify', config?: Record<string, string>): PaymentProvider {

  let newProvider: PaymentProvider;

  if(type === 'shopify') {

    if(!config?.store || !config.token) throw new Error('PAYMENT_CONFIG_MISSING');

    newProvider = new ShopifyGraphQLAPI(config.store, config.token);

  } else {

    throw new Error('NO_PAYMENT_PROVIDER');

  }

  return newProvider;

}