import logger from '@/mixins/logger';
import type { App } from 'vue';

const HelpersPlugin = {

  leadingZero (value: string | number, minLength: number) {
    return value.toString().padStart(minLength, '0');
  }

}
const plugin = {
  install: (vue: App): void => {

    vue.config.globalProperties.$helpers = HelpersPlugin;
    logger.plugins('helpers installed')
  },
};

export default plugin;
export {
  HelpersPlugin
};
