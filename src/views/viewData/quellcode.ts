export default {
  'id'      : 'home',
  'company' : 'company',
  'project' : 'project',
  'settings': {
    'mode': 'presentation'
  },
  'state'  : 'publish',
  'modules': [
    {
      'type'     : 'quellcode-module',
      'variant'  : [''],
      'textblock': {
        'headline': 'Comparative Analysis of Product Features',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      code: `
const components: Record<string, Record<'default', Component>> = import.meta.glob('./components/modules/*', {eager: true});

console.log(components);

const app = createApp(App);

loadComponents(components, undefined, app);

app.use(createPinia());
app.use(createRouter(routes));`
    },
    {
      'type'     : 'quellcode-module',
      'variant'  : ['darkmode'],
      'textblock': {
        'headline': 'Comparative Analysis of Product Features',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      code: `
const components: Record<string, Record<'default', Component>> = import.meta.glob('./components/modules/*', {eager: true});

console.log(components);

const app = createApp(App);

loadComponents(components, undefined, app);

app.use(createPinia());
app.use(createRouter(routes));`
    }
  ]
}
