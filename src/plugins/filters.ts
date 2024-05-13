import logger from '@/mixins/logger';
import dayjs from 'dayjs';
import type { App } from 'vue';

const HelpersPlugin = {

  leadingZero (value: string | number, minLength: number) {
    return value.toString().padStart(minLength, '0');
  },

  getFilename (contentType: 'public' | 'members', path?: string) {

    const contentIdArray = [];

    if(!path || path === '/') return 'home';

    if(contentType === 'members' && path !== '/m' && !path.startsWith('/m/')) contentIdArray.push('m');

    contentIdArray.push(...path.split('/'));

    return contentIdArray.filter((single) => single.length).join('/');
  
  },

  date (date: string | Date, format?: string) {

    return dayjs(date).locale('de').format(format || 'DD.MM.YYYY HH:mm');

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
