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
      variant: ['noPicture'],
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
              src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/icon-32x32.png',
            },
          },
          {
            link: {
              link: 'https://twitter.com',
            },
            picture: {
              source: [],
              alt   : 'IMAGE ALT',
              src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/icon-32x32.png',
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
          links: {
            value: [
              {
                text: 'Link with some longer text',
                link: 'https://testlink',
              },
              {
                text: 'Normal link',
                link: 'https://testlink',
              },
            ],
            title: 'Follow up Details',
            variant:['noIcon']
          },
        },
        {
          links: {
            value: [
              {
                text: 'Link with some longer text',
                link: 'https://testlink',
              },
              {
                text: 'Normal link',
                link: 'https://testlink',
              },
            ],
            title: 'Follow up links',
            variant:['noIcon']
          },
        },
        {
          links: {
            value: [
              {
                text: 'Link with some longer text',
                link: 'https://testlink',
              },
              {
                text: 'Normal link',
                link: 'https://testlink',
              },
            ],
            title: 'Follow up links',
            variant:['noIcon']
          },
        },
  
        {
          links: {
            value: [
              {
                text: 'Link with some longer text',
                link: 'https://testlink',
              },
              {
                text: 'Normal link',
                link: 'https://testlink',
              },
              {
                text: 'Link with some longer text',
                link: 'https://testlink',
              },
              {
                text: 'Normal link',
                link: 'https://testlink',
              },
              {
                text: 'Link with some longer text',
                link: 'https://testlink',
              },
              {
                text: 'Normal link',
                link: 'https://testlink',
              },
            ],
            title: 'Details',
            variant:['noIcon']
          },
        },
        {
          links: {
            value: [
              {
                text: 'Link with some longer text',
                link: 'https://testlink',
              },
              {
                text: 'Normal link',
                link: 'https://testlink',
              },
            ],
            title: 'sitemap',
            variant:['noIcon']
          },
        },
  
       ],
  
    },
    {
      type  : 'footer-module',
      variant: ['footerWithIcon'],
      legal : 'some legal information',
      picture: {
        source: [],
        alt   : 'IMAGE ALT',
        src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/lilaquadrat-logo.png',
      },
        textblock: {
          headline: 'headline',
          subline: 'subline',
          intro: 'Kontakt',
          text: [
            'Streetnane of company Postcode Streetname Number',
            'Postcode Streetname'
          ],
        },
        list: {
          value: [
            'This is a list item',
            'this an other list item',
            'I am a third list item',
          ],
          title: 'some nice list',
        },
        links: {
          value: [
            {
              text: 'Link with some longer text',
              link: 'https://testlink',
            },
            {
              text: 'Normal link',
              link: 'https://testlink',
            },
          ],
          title: 'Follow up links',
          variant:['noIcon']
        },
 
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
              src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/icon-32x32.png',
            },
          },
          {
            link: {
              link: 'https://twitter.com',
            },
            picture: {
              source: [],
              alt   : 'IMAGE ALT',
              src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/icon-32x32.png',
            },
          },
          {
            link: {
              link: 'https://twitter.com',
            },
            picture: {
              source: [],
              alt   : 'IMAGE ALT',
              src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/icon-32x32.png',
            },
          },
          {
            link: {
              link: 'https://twitter.com',
            },
            picture: {
              source: [],
              alt   : 'IMAGE ALT',
              src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/icon-32x32.png',
            },
          },
          
        ],
      },
     sitemap: [
      {
        links: {
          value: [
            {
              text: 'Link with some longer text',
              link: 'https://testlink',
            },
            {
              text: 'Normal link',
              link: 'https://testlink',
            },
          ],
          title: 'Follow up links',
          variant:['noIcon']
        },
      },
      
      {
        links: {
          value: [
            {
              text: 'Link with some longer text',
              link: 'https://testlink',
            },
            {
              text: 'Normal link',
              link: 'https://testlink',
            },
            {
              text: 'Link with some longer text',
              link: 'https://testlink',
            },
            {
              text: 'Normal link',
              link: 'https://testlink',
            },
            {
              text: 'Link with some longer text',
              link: 'https://testlink',
            },
            {
              text: 'Normal link',
              link: 'https://testlink',
            },
            {
              text: 'Link with some longer text',
              link: 'https://testlink',
            },
            {
              text: 'Normal link',
              link: 'https://testlink',
            },
            {
              text: 'Link with some longer text',
              link: 'https://testlink',
            },
            {
              text: 'Normal link',
              link: 'https://testlink',
            },
          ],
          title: 'Follow up links',
          // variant:['noIcon']
        },
      },
      {
        links: {
          value: [
            {
              text: 'Link with some longer text',
              link: 'https://testlink',
            },
            {
              text: 'Normal link',
              link: 'https://testlink',
            },
          ],
          title: 'Follow up links',
          variant:['noIcon']
        },
      },
     ],
    },
  ],
};

export default content;