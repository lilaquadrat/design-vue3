import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'Footer',
    description: 'Sitemap, Social Links and legal infos'
  },
  state  : 'publish',
  modules: [
    {
      type  : 'footer-module',
      legal : 'some legal information',
      social: {
        title   : 'Social',
        elements: [
          {
            link: {
              link: 'https://fb.com',
            },
            picture: {
              source: [],
              alt   : 'IMAGE ALT',
              src   : 'icon-32x32.png',
            },
          },
          {
            link: {
              link: 'https://twitter.com',
            },
            picture: {
              source: [],
              alt   : 'IMAGE ALT',
              src   : 'icon-32x32.png',
            },
          },
        ],
      },
      contact: {
        title: 'Contact',
        link : {
          text: 'Call us: +012283838',
          link: 'tel:012222',
        },
        lists : [1],
        editor: [2],
      },
      sitemap: [
        {
          title   : 'Sitemap 1',
          elements: [
            {
              text: 'Link #1',
              link: '/test',
            },
            {
              text: 'Link #2',
              link: '/test',
            },
            {
              text: 'Link #3',
              link: '/test',
            },
            {
              text: 'Link #4',
              link: '/test',
            },
            {
              text: 'Link #5',
              link: '/test',
            },
          ],
        },
        {
          title   : 'Sitemap 2',
          elements: [
            {
              text: 'Link #1',
              link: '/test',
            },
            {
              text: 'Link #2',
              link: '/test',
            },
            {
              text: 'Link #3',
              link: '/test',
            },
            {
              text: 'Link #4',
              link: '/test',
            },
            {
              text: 'Link #5',
              link: '/test',
            },
          ],
        },
        {
          title   : 'Sitemap 3',
          elements: [
            {
              text: 'Link #1',
              link: '/test',
            },
            {
              text: 'Link #2',
              link: '/test',
            },
            {
              text: 'Link #3',
              link: '/test',
            },
            {
              text: 'Link #4',
              link: '/test',
            },
            {
              text: 'Link #5',
              link: '/test',
            },
          ],
        },
      ],
  
    },
  ],
};

export default content;