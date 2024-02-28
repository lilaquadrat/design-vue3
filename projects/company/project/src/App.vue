<script setup lang="ts">
import { getAvailableModules } from '@/mixins/loadComponents';
import useEditorStore from '@/stores/editor.store';
import { onMounted } from 'vue';
import modulesBrowser from './modules.browser';
import modulesMail from './modules.mail';
import useMainStore from '@/stores/main.store';
import staticData from './staticData';
import customModules from './customModules';
import partialsBrowser from './partials.browser';
import partialsMail from './partials.mail';

const editorStore = useEditorStore();
const mainStore = useMainStore();

onMounted(() => {

  editorStore.availableModulesWithRevision = { revision: 2, modules: getAvailableModules(modulesBrowser.modules) };
  editorStore.availableModulesWithRevisionMail = { revision: 1, modules: getAvailableModules(modulesMail.modules) };

  editorStore.modulesBrowser = modulesBrowser.modules;
  editorStore.modulesMail = modulesMail.modules;
  editorStore.partialsBrowser = partialsBrowser;
  editorStore.partialsMail = partialsMail;

  if(staticData) {

    mainStore.staticData = staticData;

  }

  if(customModules.length) {

    mainStore.customModules = customModules;

  }

});
</script>

<template>
  <RouterView />
  <lila-mediadetection-partial />
</template>

<style lang="less">
@import "./projects/company/project/src/assets/less/loadFonts.less";
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
