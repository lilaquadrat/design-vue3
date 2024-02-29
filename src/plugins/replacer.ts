import logger from '@/mixins/logger';
import replaceVariables from '@/mixins/replaceVariables';
import useEditorStore from '@/stores/editor.store';
import type { App } from 'vue';

const plugin = {
  install: (vue: App): void => {

    const editorStore = useEditorStore();

    vue.config.globalProperties.$replacer = (content: string) => replaceVariables(content, editorStore.context);
    logger.plugins('replacer installed')
  },
};

export default plugin;
