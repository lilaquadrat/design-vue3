<script setup lang="ts">
import useEditorStore from '@/stores/editor.store';
import { hardCopy, prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue';
import { type Content, type ContentWithPositions, type EditorActiveModule, type StudioIframeMessage } from '@lilaquadrat/interfaces';
import { onBeforeUnmount } from 'vue';
import { watch } from 'vue';
import type { AppEditorConfiguration } from '@lilaquadrat/interfaces';
import { loadViaDeclarationSync } from '@/mixins/loadComponents';
import useContentStore from '@/stores/content.store';
import useMainStore from '@/stores/main.store';
import { eventDeclaration } from '@/plugins/events';
import { scrollToSelector } from '@/mixins/scroll';

const currentInstance = getCurrentInstance();
const editorStore = useEditorStore();
const contentStore = useContentStore();
const content = ref<ContentWithPositions>({ settings: {}, top: [], content: [], bottom: [], additional: {} });
const siteSettings = ref<Omit<Content, 'modules'|'genericData'|'childData'>>();
const live = ref<boolean>(false);
// const parentUrl = ref<string>(`${window.location.protocol}//${window.location.host}/editor`);
const contentCache = ref<Content['modules']>();
const settingsCache = ref<AppEditorConfiguration>();
const active = ref<EditorActiveModule>();
const mainStore = useMainStore();
const init = ref<boolean>(false);

watch(siteSettings, () => {

  /**
  * if the target type changes we need to update the available modules
  */
  const useTarget = siteSettings.value?.target || 'browser';

  if(useTarget !== mainStore.target) {

    const target = siteSettings.value?.target === 'browser' || !siteSettings.value?.target 
      ? 'browser' 
      : siteSettings.value?.target

    postModules();
    postCustomModules();
    
    if (currentInstance) {

      loadViaDeclarationSync(target === 'browser' ? editorStore.modulesBrowser : editorStore.modulesMail, 'lila', 'module', currentInstance.appContext.app);
      loadViaDeclarationSync(target === 'browser' ? editorStore.partialsBrowser : editorStore.partialsMail, 'lila', 'partial', currentInstance.appContext.app);

    }

    mainStore.target = useTarget;

  }
    
})

function messageHandler (message: StudioIframeMessage) {

  if (message.data.type === 'studio-content') {
    console.groupCollapsed('MESSAGE_STUDIO_CONTENT');
    console.groupEnd();

    contentCache.value = message.data.data;
    updateContent();
  }

  //editor main configuration
  if (message.data.type === 'studio-settings') {
    console.groupCollapsed('MESSAGE_STUDIO_SETTINGS');
    console.groupEnd();

    settingsCache.value = message.data.data;
    updateContent();
  }

  if (message.data.type === 'studio-editor-settings') {
    console.groupCollapsed('MESSAGE_STUDIO_EDITOR_SETTINGS');
    console.groupEnd();

    siteSettings.value = message.data.data;

    if(!init.value) {

      postModules();
      postCustomModules();
      postEvents();
      init.value = true;

    }

    updateContent();
    updateContext();

  }

  if (message.data.type === 'studio-active') {
    console.groupCollapsed('MESSAGE_STUDIO_ACTIVE');
    console.groupEnd();

    active.value = message.data.data;

    if (active.value) {

      scrollToModule(active.value);

    }
  }

  if (message.data.type === 'studio-cookie-reset') {
    console.groupCollapsed('MESSAGE_STUDIO_COOKIE_RESET');
    console.groupEnd();

    resetCookies();
  }
}

onMounted(() => {

  if (window.origin === 'null') {
    live.value = true;
  }

  if (live.value) return;

  removeListeners()
  addListeners();

  window.parent.postMessage('studio-design-settings', '*');
  window.parent.postMessage('studio-design-ready', '*');
});

onBeforeUnmount(() => removeListeners());

function removeListeners () {
  window.removeEventListener('message', messageHandler, false);
}

function addListeners () {
  window.addEventListener('message', messageHandler, false);
}

function updateContent () {
  content.value = prepareContent({ modules: contentCache.value, ...siteSettings.value });
}

function postModules () {

  const modules = mainStore.target === 'browser'
    ? editorStore.availableModulesWithRevision 
    : editorStore.availableModulesWithRevisionMail

  window.parent.postMessage(
    {
      type: 'studio-design-modules-with-revision',
      data: hardCopy(modules),
    },
    '*',
  );

}

function postCustomModules () {

  const modules = mainStore.target === 'browser'
    ? mainStore.customModulesBrowser 
    : mainStore.customModulesMail

  window.parent.postMessage(
    {
      type: 'studio-design-custom-modules',
      data: hardCopy(modules),
    },
    '*',
  );

}

function postEvents () {

  window.parent.postMessage(
    {
      type: 'studio-design-events',
      data: eventDeclaration,
    },
    '*',
  );

}

/**
 * sets sitetitle and description
 */
function updateContext () {

  contentStore.setContext({
    sitetitle  : siteSettings?.value?.settings?.title,
    description: siteSettings?.value?.settings?.description,
  })

}

function resetCookies () {
  const cookies = document.cookie.split(';').filter((single) => single);

  cookies.forEach((single) => {
    const name = single.split('=');

    document.cookie = `${name[0].trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None;`;
  });
}

function scrollToModule (active: EditorActiveModule): void {

  nextTick().then(() => {
    const baseModule = contentCache.value?.find((single) => single.uuid === active.uuid);
    const containerSelector = baseModule?.position === 'content' || !baseModule?.position ? '.lila-content-module .container:not(.top, .bottom)' : `.lila-content-module .container.${baseModule.position}`;
    const contentPosition: Content['modules'] = baseModule?.position === 'content' || !baseModule?.position ? content.value.content : content.value[baseModule.position];
    const index = contentPosition?.findIndex((single) => single.uuid === active.uuid);

    if (!index && index !== 0) return;

    scrollToSelector(`${containerSelector} .lila-module:nth-child(${index + 1}), ${containerSelector} .partial-container:nth-child(${index + 1})`,)

  });

}
</script>
<template>
  <article class="editor-screen screen">
    <lila-content-module :content="content" />
  </article>
</template>
