import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'Picturegroup',
    description: 'Multipe pictures with text'
  },
  state  : 'publish',
  modules: [
    {
      type     : 'picturegroup-module',
      variant  : ['cards'],
      textblock: {
        headline: 'Picturegroup: fourColumns',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.'
      },
      elements: [
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          },
          textblock: {
            headline: 'Picturegroup: fourColumns',
            text    : ['Lorem ipsum dolor sit amet, consectetur adipis.']
          },
          links: {
            value: [
              {
                text: 'more details',
                link: '/test'
              }
            ]
          },
          link: {
            link: '/test'
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          },
          textblock: {
            headline: 'consectetur adipiscing',
            text    : ['etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.']
          },
          links: {
            value: [
              {
                text: 'more details',
                link: '/test'
              }
            ]
          },
          link: {
            link: '/test'
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          },
          textblock: {
            headline: 'incididunt',
            text    : ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.']
          },
          links: {
            value: [
              {
                text: 'more details',
                link: '/test'
              }
            ]
          },
          link: {
            link: '/test'
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          },
          textblock: {
            headline: 'incididunt',
            text    : ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.']
          },
          link: {
            link: '/test'
          }
        },
      ],
    },
    {
      type     : 'picturegroup-module',
      variant  : ['fourColumns'],
      textblock: {
        headline: 'Picturegroup: fourColumns',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          },
         
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          },
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
    },
    {
      type     : 'picturegroup-module',
      variant  : ['fit'],
      textblock: {
        headline: 'with fit',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
         
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          },
        
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
    },
    {
      type     : 'picturegroup-module',
      variant  : ['fit', 'fourColumns'],
      textblock: {
        headline: 'four columns with fit',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
      
    },
    {
      type     : 'picturegroup-module',
      variant  : ['small'],
      textblock: {
        headline: 'small without fit',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          link: {
            link: '/test'
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          link: {
            link: '/test'
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
    },
    {
      type     : 'picturegroup-module',
      variant  : ['small', 'fit'],
      textblock: {
        headline: 'small with fit',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          link: {
            link: '/test'
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          link: {
            link: '/test'
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
    },
    {
      type     : 'picturegroup-module',
      variant  : [ 'align'],
      textblock: {
        headline: 'three pics aligned',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          link: {
            link: '/test'
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          link: {
            link: '/test'
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
    },
    {
      type     : 'picturegroup-module',
      variant  : ['color1'],
      textblock: {
        headline: 'Backgroundcolor: color1',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          link: {
            link: '/test'
          },
          textblock: {
            headline: 'four columns with fit and links and description',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          link: {
            link: '/test'
          },
          textblock: {
            subline: 'four columns with fit and links and description',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          textblock: {
            text: [
              'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
            ],
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
    },
    {
      type     : 'picturegroup-module',
      variant  : ['contact'],
      textblock: {
        headline: 'three pics + contact',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          links: {
            value: [
              {text: '017674715883', link: 'tel:017674715883'},
              {text: 'm.schuebel@lila2.de', link: 'mail:m.schuebel@lila2.de'},
            ],
          },
          textblock: {
            headline: 'Max Mustermann',
            intro   : 'Abteil A',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          links: {
            title: 'contact',
            value: [
              {text: '017674715883', link: 'tel:017674715883'},
              {text: 'm.schuebel@lila2.de', link: 'mail:m.schuebel@lila2.de'},
            ],
          },
          textblock: {
            headline: 'Max Testermann',
            intro   : 'Abteil B',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          links: {
            value: [
              {text: '017674715883', link: 'tel:017674715883'},
              {text: 'm.schuebel@lila2.de', link: 'mail:m.schuebel@lila2.de'},
            ],
          },
          textblock: {
            headline: 'Max Mustermann',
            intro   : 'Abteil C',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        }
      ],
    },
    {
      type     : 'picturegroup-module',
      variant  : ['color3'],
      textblock: {
        headline: 'Backgroundcolor: color3',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          link: {
            link: '/test'
          },
          textblock: {
            headline: 'four columns with fit and links and description',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          link: {
            link: '/test'
          },
          textblock: {
            subline: 'four columns with fit and links and description',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          textblock: {
            text: [
              'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
            ],
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
    },
    {
      type     : 'picturegroup-module',
      variant  : ['fourColumns', 'fit', 'align'],
      textblock: {
        headline: 'four columns with fit and links, description and small',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          link: {
            link: '/test'
          },
          textblock: {
            headline: 'four columns with fit and links and description',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          link: {
            link: '/test'
          },
          textblock: {
            subline: 'four columns with fit and links and description',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          textblock: {
            text: [
              'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
            ],
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
    },
    {
      type     : 'picturegroup-module',
      variant  : ['color1', 'align', 'fit'],
      textblock: {
        headline: '6 Pics with fit of links, description with Backgroundcolor and aligned',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          link: {
            link: '/test'
          },
          textblock: {
            headline: 'four columns with fit and links and description',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          link: {
            link: '/test'
          },
          textblock: {
            subline: 'four columns with fit and links and description',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          textblock: {
            text: [
              'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
            ],
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
     
    },
    {
      type     : 'picturegroup-module',
      variant  : ['small', 'fit'],
      textblock: {
        headline: 'small with fit and links and description',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
    },
    {
      type     : 'picturegroup-module',
      variant  : ['align', 'fit'],
      textblock: {
        headline: 'align with fit and links and description',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
    },      
  ],
};

export default content;