import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'Index',
    description: 'Onpage navigation to other modules'
  },
  state  : 'publish',
  modules: [
    {
      type     : 'index-module',
      variant  : ['backgroundGrey'],
      textblock: {
        headline: 'some headline'
      },
      links: {
        title: 'Auf dieser Seite',
        value: [
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          }
        ]
      }
    },
    {
      type     : 'index-module',
      variant  : ['backgroundColor3'],
      textblock: {
        headline: 'some headline'
      },
      links: {
        title: 'Auf dieser Seite',
        value: [
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          }
        ]
      }
    },
    {
      type     : 'index-module',
      variant  : ['medium'],
      textblock: {
        headline: 'some headline'
      },
      links: {
        title: 'Auf dieser Seite',
        value: [
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          }
        ]
      }
    },
    {
      type     : 'index-module',
      variant  : ['backgroundColor1'],
      textblock: {
        headline: 'some headline'
      },
      links: {
        title: 'Auf dieser Seite',
        value: [
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          }
        ]
      }
    },
    {
      type     : 'index-module',
      variant  : ['numbered'],
      textblock: {
        headline: 'some headline'
      },
      links: {
        title: 'Auf dieser Seite',
        value: [
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          }
        ]
      }
    },
    {
      type     : 'index-module',
      variant  : ['backgroundGrey', 'numbered', 'medium'],
      textblock: {
        headline: 'some headline'
      },
      links: {
        title: 'Auf dieser Seite',
        value: [
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          }
        ]
      }
    },
  ],
};

export default content;