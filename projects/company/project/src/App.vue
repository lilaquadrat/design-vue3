<script setup lang="ts">
import { getAvailableModules } from '@/mixins/loadComponents';
import useEditorStore from '@/stores/editor.store';
import { onMounted } from 'vue';
import modules from './modules';
import useMainStore from '@/stores/main.store';
import staticData from './staticData';

const editorStore = useEditorStore();
const mainStore = useMainStore();

onMounted(() => {

  editorStore.availableModulesWithRevision = { revision: 2, modules: getAvailableModules(modules.modules) };

  const currentUrl = new URL(window.location.toString());
  const ISLOCAL = currentUrl.port === '5173';

  if (ISLOCAL) {

    mainStore.apiConfig = {
      mode           : 'custom',
      customEndpoints: {
        api  : 'http://localhost:9090',
        media: 'http://localhost:9091',
      },
      company: process.env.company,
      project: process.env.project,
    };

  } else {

    mainStore.apiConfig = {
      mode   : process.env.apiMode,
      company: process.env.company,
      project: process.env.project,
    };

  }

  if(staticData) {

    mainStore.staticData = staticData;

  }

});
</script>

<template>
  <RouterView />
  <lila-mediadetection-partial />
</template>

<style lang="less">
body {
  .font-normal;

  @media print {
    background: transparent;
    background-attachment: scroll;
  }

  color: @textColor;

  font-size: @fontText;
  .lineHeight(@fontText, 1.5);

  overflow-x: hidden;

  &.fullscreen {
    overflow: hidden;
  }
}

@page {
  margin: 0;
  size: 210mm 297mm;
}

* {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  background-repeat: no-repeat;

  list-style-type: none;

  text-decoration: none;
}
</style>
