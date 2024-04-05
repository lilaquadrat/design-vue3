import logger from '@/mixins/logger';
import replaceVariables from '@/mixins/replaceVariables';
import useContentStore from '@/stores/content.store';
import useUserStore from '@/stores/user.store';
import type { App } from 'vue';

const plugin = {
  install: (vue: App): void => {

    const contentStore = useContentStore();
    const userStore = useUserStore();

    vue.config.globalProperties.$replacer = (content: string) => replaceVariables(content, {...contentStore.context, recipient: contentStore.recipient, user: userStore.userData });
    logger.plugins('replacer installed')
  },
};

export default plugin;
