import { basename } from 'node:path';
import { renderToString } from 'vue/server-renderer';
import { createApp } from './main';

import loadComponents from '@/mixins/loadComponents';
import type { Component } from 'vue';

const globalModules: Record<string, Record<'default', Component>> = import.meta.glob('../../../../src/components/modules/*', { eager: true });
const globalPartials: Record<string, Record<'default', Component>> = import.meta.glob('../../../../src/components/partials/*', { eager: true });
const localComponents: Record<string, Record<'default', Component>> = import.meta.glob('./components/modules/*', { eager: true });

export async function render(url, manifest) {
  const { app, router } = createApp();

  loadComponents(localComponents, 'lila', app);
  loadComponents(globalModules, 'lila', app);
  loadComponents(globalPartials, 'lila', app);

  // set the router to the desired URL before rendering
  await router.push('/');
  await router.isReady();

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx = {};
  const html = await renderToString(app, ctx);
  // the SSR manifest generated by Vite contains module -> chunk/asset mapping
  // which we can then use to determine what files need to be preloaded for this
  // request.
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

  return [html, preloadLinks];
}

function renderPreloadLinks(modules, manifest) {
  let links = '';
  const seen = new Set();
  
  console.log(modules,manifest);
  modules.forEach((id: string) => {

    console.log(id);

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

function renderPreloadLink(file: string) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    // TODO
    return '';
  }
}