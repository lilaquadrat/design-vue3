<script setup lang="ts">
import useEditorStore from '@/stores/editor.store';
import { hardCopy, prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import { nextTick, onMounted, ref } from 'vue';
import { type Content, type ContentWithPositions, type EditorActiveModule, type StudioIframeMessage } from '@lilaquadrat/interfaces';
import { onBeforeUnmount } from 'vue';

const editorStore = useEditorStore();
const content = ref<ContentWithPositions>({ settings: {}, top: [], content: [], bottom: [], additional: {} });
const siteSettings = ref<Content['settings']>();
const live = ref<boolean>(false);
// const parentUrl = ref<string>(`${window.location.protocol}//${window.location.host}/editor`);
const contentCache = ref<Content['modules']>();
const settingsCache = ref<Content['settings']>();
const active = ref<EditorActiveModule>();

function messageHandler (message: StudioIframeMessage<Content['modules'] | Content['settings'] | EditorActiveModule>) {

  if (message.data.type === 'studio-content') {
    console.groupCollapsed('MESSAGE_STUDIO_CONTENT');
    console.log(message.data.data);
    console.groupEnd();

    contentCache.value = message.data.data as Content['modules'];
    updateContent();
  }

  if (message.data.type === 'studio-editor-settings') {
    console.groupCollapsed('MESSAGE_STUDIO_EDITOR_SETTINGS');
    console.log(message.data.data);
    console.groupEnd();

    settingsCache.value = message.data.data as Content['settings'];
    updateContent();
  }

  if (message.data.type === 'studio-settings') {
    console.groupCollapsed('MESSAGE_STUDIO_SETTINGS');
    console.log(message.data.data);
    console.groupEnd();

    // this.$store.commit('setSettings', message.data.data);
    siteSettings.value = message.data.data as Content['settings'];
  }

  if (message.data.type === 'studio-active') {
    console.groupCollapsed('MESSAGE_STUDIO_ACTIVE');
    console.log(message.data.data);
    console.groupEnd();

    active.value = message.data.data as EditorActiveModule;

    if (active.value) {

      scrollToModule(active.value);

    }
  }

  if (message.data.type === 'studio-cookie-reset') {
    console.groupCollapsed('MESSAGE_STUDIO_COOKIE_RESET');
    console.log(message.data.data);
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

  window.parent.postMessage(
    {
      type: 'studio-design-modules-with-revision',
      data: hardCopy(editorStore.availableModulesWithRevision),
    },
    '*',
  );

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
  content.value = prepareContent({ modules: contentCache.value, ...settingsCache.value });
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

    const module = document.querySelector(
      `${containerSelector} .lila-module:nth-child(${index + 1}), ${containerSelector} .partial-container:nth-child(${index + 1})`,
    );

    if (!module) return;

    module.scrollIntoView({
      behavior: 'smooth',
    });
  });

}
</script>
<template>
  <article class="editor-screen screen">
    <lila-content-module :content="content" />
  </article>
</template>
