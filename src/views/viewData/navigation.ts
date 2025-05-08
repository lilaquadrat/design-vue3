import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
  id: 'home',
  company: 'company',
  project: 'project',
  settings: {
    mode: 'presentation',
    title: 'Navigation',
    description: 'Top Navigation for general usage'
  },
  state: 'publish',
  modules: [
    // {
    //   type: 'navigation-module',
    //   position: 'top',
    //   variant: [],
    //   'name': 'thats a very long name is the top',
    //   "picture": {
    //     "src": "https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_beachatsunset.jpg",
    //     "alt": "",
    //     "copyright": "",
    //   },
    //   'elements': [
    //     {
    //       'text': 'with children 1 & icon',
    //       'link': '',
    //       'icon': 'arrow-right',
    //       'links': [
    //         {
    //           'text': 'first children 11',
    //           'link': 'https://lilaquadrat.de',
    //         },
    //         {
    //           'text': 'first children 12',
    //           'link': '/chisas',
    //         },
    //         {
    //           'text': 'first children 13',
    //           'link': '/chisas',
    //         }
    //       ],
    //       'external': false
    //     },
    //     {
    //       'text': 'normal link & icon',
    //       'link': '/link',
    //       'icon': 'arrow-right',
    //       'external': false
    //     },
    //     {
    //       'text': 'normal link',
    //       'link': '/link',
    //       'external': false
    //     },
    //     {
    //       'text': 'normal link',
    //       'link': '/link',
    //       'external': false
    //     },
    //     {
    //       'text': 'with children 1',
    //       'link': '',
    //       'links': [
    //         {
    //           'text': 'first children 31 with some very long text',
    //           'link': '/chisas',
    //         },
    //         {
    //           'text': 'first children 32',
    //           'link': '/chisas',
    //         },
    //         {
    //           'text': 'first children 33',
    //           'link': '/chisas',
    //         }
    //       ],
    //       'external': false
    //     }
    //   ]
    // },
    // {
    //   type: 'navigation-module',
    //   position: 'top',
    //   variant: ['left'],
    //   'name': 'thats a very long name is the top',
    //   'elements': [
    //     {
    //       'text': 'with children 1 & icon',
    //       'link': '',
    //       'icon': 'arrow-right',
    //       'links': [
    //         {
    //           'text': 'first children 11',
    //           'link': 'https://lilaquadrat.de',
    //         },
    //         {
    //           'text': 'first children 12',
    //           'link': '/chisas',
    //         },
    //         {
    //           'text': 'first children 13',
    //           'link': '/chisas',
    //         }
    //       ],
    //       'external': false
    //     },
    //     {
    //       'text': 'normal link & icon',
    //       'link': '/link',
    //       'icon': 'arrow-right',
    //       'external': false
    //     },
    //     {
    //       'text': 'normal link',
    //       'link': '/link',
    //       'external': false
    //     },
    //     {
    //       'text': 'normal link',
    //       'link': '/link',
    //       'external': false
    //     },
    //     {
    //       'text': 'normal link',
    //       'link': '/link',
    //       'external': false
    //     },
    //     {
    //       'text': 'normal link',
    //       'link': '/link',
    //       'external': false
    //     },
    //     {
    //       'text': 'normal link',
    //       'link': '/link',
    //       'external': false
    //     },
    //     {
    //       'text': 'normal link',
    //       'link': '/link',
    //       'external': false
    //     },
    //     {
    //       'text': 'with children 1',
    //       'link': '',
    //       'links': [
    //         {
    //           'text': 'first children 31 with some very long text',
    //           'link': '/chisas',
    //         },
    //         {
    //           'text': 'first children 32',
    //           'link': '/chisas',
    //         },
    //         {
    //           'text': 'first children 33',
    //           'link': '/chisas',
    //         }
    //       ],
    //       'external': false
    //     }
    //   ]
    // },
    {
      type: 'navigation-module',
      position: 'top',
      variant: ['overlay'],
      'name': 'thats a very long name is the top',
      'elements': [
        {
          'text': 'with children 1 & icon',
          'link': '',
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
          'external': false
        },
        {
          'text': 'normal link & icon',
          'link': '/link',
          'external': false
        },
        // {
        //   'text': 'normal link',
        //   'link': '/link',
        //   'external': false
        // },
        // {
        //   'text': 'normal link',
        //   'link': '/link',
        //   'external': false
        // },
        // {
        //   'text': 'normal link',
        //   'link': '/link',
        //   'external': false
        // },
        // {
        //   'text': 'normal link & icon',
        //   'link': '/link',
        //   'external': false
        // },
        // {
        //   'text': 'normal link',
        //   'link': '/link',
        //   'external': false
        // },
        // {
        //   'text': 'normal link',
        //   'link': '/link',
        //   'external': false
        // },
        // {
        //   'text': 'normal link',
        //   'link': '/link',
        //   'external': false
        // },
        // {
        //   'text': 'normal link & icon',
        //   'link': '/link',
        //   'external': false
        // },
        // {
        //   'text': 'normal link',
        //   'link': '/link',
        //   'external': false
        // },
        // {
        //   'text': 'normal link',
        //   'link': '/link',
        //   'external': false
        // },
        {
          'text': 'normal link',
          'link': '/link',
          'external': false
        },
        {
          'text': 'normal link & icon',
          'link': '/link',
          'external': false
        },
        {
          'text': 'normal link',
          'link': '/link',
          'external': false
        },
        {
          'text': 'normal link',
          'link': '/link',
          'external': false
        },
        {
          'text': 'normal link',
          'link': '/link',
          'external': false
        },
        {
          'text': 'with children 1',
          'link': '',
          'links': [
            {
              'text': 'first children 31 with some very long text',
              'link': '/chisas',
            },
            {
              'text': 'first children 32',
              'link': '/chisas',
            },
            {
              'text': 'first children 33',
              'link': '/chisas',
            }
          ],
          'external': false
        },
        {
          'text': 'with children 1',
          'link': '',
          'links': [
            {
              'text': 'first children 31 with some very long text',
              'link': '/chisas',
            },
            {
              'text': 'first children 32',
              'link': '/chisas',
            },
            {
              'text': 'first children 33',
              'link': '/chisas',
            }
          ],
          'external': false
        },
        {
          'text': 'with children 1',
          'link': '',
          'links': [
            {
              'text': 'first children 31 with some very long text',
              'link': '/chisas',
            },
            {
              'text': 'first children 32',
              'link': '/chisas',
            },
            {
              'text': 'first children 33',
              'link': '/chisas',
            }
          ],
          'external': false
        },
        {
          'text': 'with children 1',
          'link': '',
          'links': [
            {
              'text': 'first children 31 with some very long text',
              'link': '/chisas',
            },
            {
              'text': 'first children 32',
              'link': '/chisas',
            },
            {
              'text': 'first children 33',
              'link': '/chisas',
            }
          ],
          'external': false
        }
      ]
    },
  ],
};

export default content;