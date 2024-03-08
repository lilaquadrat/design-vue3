import { renderToString } from 'vue/server-renderer';
import { getAppInstance } from './main';

import { basename } from 'path';
import type { Content } from '@lilaquadrat/interfaces';
import useMainStore from '@/stores/main.store';
import useContentStore from '@/stores/content.store';

// const globalModules: Record<string, Record<'default', Component>> = import.meta.glob('../../../../src/components/modules/*', { eager: true });
// const globalPartials: Record<string, Record<'default', Component>> = import.meta.glob('../../../../src/components/partials/*', { eager: true });
// const localComponents: Record<string, Record<'default', Component>> = import.meta.glob('./components/modules/*', { eager: true });

export async function render (url: string, context: any, contextData: Content[], manifest: Record<string, string[]>) {
  const { app, router, pinia } = getAppInstance(context);

  await router.push(url);
  await router.isReady();

  const mainStore = useMainStore();
  const contentStore = useContentStore();

  mainStore.setData(context.data);
  mainStore.configuration = context.settings;

  contentStore.addMulti(contextData);

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx: { modules?: Set<string> } = {};
  const html = await renderToString(app, ctx);
  // the SSR manifest generated by Vite contains module -> chunk/asset mapping
  // which we can then use to determine what files need to be preloaded for this
  // request.
  const initialState = JSON.stringify(pinia.state.value).replace(/</g, '\\u003c');
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

  return { html, preloadLinks, initialState };
}

function renderPreloadLinks (modulesSet: Set<string>, manifest: Record<string, string[]>) {
  let links = '';
  const seen = new Set();
  // const modules = Array.from(modulesSet);

  modulesSet?.forEach((id) => {

    const files = manifest[id];

    if (files) {

      files.forEach((file: string) => {

        if (!seen.has(file)) {
          seen.add(file);

          const filename = basename(file);

          if (manifest[filename]) {

            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }

          }

          links += renderPreloadLink(file);
        }

      });
    }

  });

  return links;

}

function renderPreloadLink (file: string) {
  if (file?.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith('.woff')) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith('.woff2')) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith('.gif')) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith('.png')) {
    return `<link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    // TODO
    return '';
  }
}