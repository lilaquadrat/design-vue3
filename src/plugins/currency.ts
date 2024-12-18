import logger from '@/mixins/logger';
import type { App } from 'vue';

function formatCurrency (amount: number) {

  return new Intl.NumberFormat(navigator?.language || 'en-US', {
    style   : 'currency',
    currency: 'EUR',
  }).format(amount);

}

const plugin = {
  install: (vue: App): void => {
      
    vue.config.globalProperties.$currency = (amount: number) => formatCurrency(amount);
  
    logger.plugins('currency installed');
      
  },
};

export default plugin;
export {
  formatCurrency
}