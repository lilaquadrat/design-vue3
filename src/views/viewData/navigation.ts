export default {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode: 'presentation'
  },
  state  : 'publish',
  modules: [
    {
      type      : 'navigation-module',
      'name'    : 'name',
      'elements': [
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
          'text' : 'with children',
          'link' : '',
          'icon' : '',
          'links': [
            {
              'text'      : 'first children 1',
              'link'      : '/chisas',
              'icon'      : '',
              'classes'   : [],
              'attributes': [],
              'variant'   : [],
              'external'  : false
            },
            {
              'text'      : 'first children 2',
              'link'      : '/chisas',
              'icon'      : '',
              'classes'   : [],
              'attributes': [],
              'variant'   : [],
              'external'  : false
            },
            {
              'text'      : 'first children 3',
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