import type { Content } from '@lilaquadrat/interfaces';
import { defineAsyncComponent, type App, type Component, type AsyncComponentLoader } from 'vue';

function getName (name: string, type: 'module' | 'partial', namespace?: string) {

  return namespace ? `${namespace}-${name}-${type}` : `${name}-${type}`;

}

function loadViaGlob (components: Record<string, Record<'default', Component>>, namespace: string | undefined, app: App<Element>) {

  console.log(components);
  Object.entries(components).forEach(([filename, definition]) => {

    // Get name of component, based on filename
    // "./components/Fruits.vue" will become "Fruits"
    const matches = filename.match(/([a-z-]+)\.(module|partial).(vue|ts)$/i);

    console.log(definition);

    if (matches) {

      const componentName = namespace ? `${namespace}-${matches[1]}-${matches[2]}` : `${matches[1]}-${matches[2]}`;

      // Register component on this Vue instance
      app.component(componentName, definition.default);
    }
  });

}

function loadViaDeclaration (components: {name: string, component: AsyncComponentLoader<Component>}[], namespace: string | undefined, type: 'module' | 'partial', app: App<Element>) {

  console.log(components, namespace, app);

  components.forEach((single) => {

    const name = getName(single.name, type, namespace);

    app.component(name, defineAsyncComponent(single.component));

  });

}

function getAvailableModules (modules: any[]) {

  return modules.filter((single) => single.availableInEditor !== false).map((single) => ({
    name    : `${single.name}-module`,
    variants: single.variants || [],
    editor  : single.editor || {},
  }));

}

function createModulesArray (modules: any[]) {

  const modulesArray: any[] = [];

  modules.forEach((singleModule) => {

    if(!singleModule.target) return;

    const foundModule = modulesArray.find((single) => single.name === singleModule.name);
    const useModule = foundModule
      ? foundModule
      : {
        name   : singleModule.name,
        targets: {}
      }

    singleModule.target.forEach((target: string) => {

      useModule.targets[target] = {
        variants  : singleModule.variants,
        components: singleModule.component,
        name      : singleModule.name
      };

    });

    if(!foundModule) {

      modulesArray.push(useModule);

    }

  });

  return modulesArray;

}

export {
  loadViaGlob,
  loadViaDeclaration,
  getAvailableModules,
  createModulesArray,
}