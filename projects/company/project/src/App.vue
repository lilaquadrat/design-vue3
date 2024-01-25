<script setup lang="ts">

import { getAvailableModules } from '@/mixins/loadComponents';
import {resize} from '@/plugins/resize';
import useEditorStore from '@/stores/editor.store';
import { onMounted } from 'vue';
import modules from './modules';

const editorStore = useEditorStore();

// update the media query directly after mount otherwise it will be mobile until resize
onMounted(() => {
  
  resize.getMediaQuery();
  editorStore.availableModulesWithRevision = {revision: 2, modules: getAvailableModules(modules.modules)};

})

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
