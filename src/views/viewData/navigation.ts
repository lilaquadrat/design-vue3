import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'Navigation',
    description: 'Top Navigation for general usage'
  },
  state  : 'publish',
  modules: [
    {
      type      : 'navigation-module',
      position  : 'top',
      variant   : ['left'],
      'name'    : 'thats a very long name is the top',
      'elements': [
        {
          'text' : 'with children 1 & icon',
          'link' : '',
          'icon' : 'arrow-right',
          'links': [
            {
              'text': 'first children 11',
              'link': 'https://lilaquadrat.de',
            },
            {
              'text': 'first children 12',
              'link': '/chisas',
            },
            {
              'text': 'first children 13',
              'link': '/chisas',
            }
          ],
          'classes'   : [],
          'attributes': [],
          'external'  : false
        },
        {
          'text' : 'normal link & icon',
          'link' : '/link',
          'icon' : 'arrow-right',
          'links': [
            {
              'text'      : '',
              'link'      : '',
              'icon'      : '',
              'classes'   : [],
              'attributes': [],
              'variant'   : [],
              'external'  : false
            }
          ],
          'classes'   : [],
          'attributes': [],
          'external'  : false
        },
        {
          'text' : 'normal link',
          'link' : '/link',
          'icon' : '',
          'links': [
            {
              'text'      : '',
              'link'      : '',
              'icon'      : '',
              'classes'   : [],
              'attributes': [],
              'variant'   : [],
              'external'  : false
            }
          ],
          'classes'   : [],
          'attributes': [],
          'external'  : false
        },
        {
          'text' : 'with children 1',
          'link' : '',
          'icon' : '',
          'links': [
            {
              'text'      : 'first children 31 with some very long text',
              'link'      : '/chisas',
              'icon'      : '',
              'classes'   : [],
              'attributes': [],
              'variant'   : [],
              'external'  : false
            },
            {
              'text'      : 'first children 32',
              'link'      : '/chisas',
              'icon'      : '',
              'classes'   : [],
              'attributes': [],
              'variant'   : [],
              'external'  : false
            },
            {
              'text'      : 'first children 33',
              'link'      : '/chisas',
              'icon'      : '',
              'classes'   : [],
              'attributes': [],
              'variant'   : [],
              'external'  : false
            }
          ],
          'classes'   : [],
          'attributes': [],
          'external'  : false
        }
      ]
    },
  ],
};

export default content;