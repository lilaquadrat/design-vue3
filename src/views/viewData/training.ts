import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'Training',
    description: 'Multiple content in a single module'
  },
  state  : 'publish',
  modules: [
    {
      type     : 'training-module',
      variant  : [],
      genericData: {
        editor: ['video1', 'content1', 'video2'],
        data: {
          video1: {
            id: 'video1',
            settings: {
              title      : 'Video #1 Title',
              description: 'Description for Video #1',
              mode       : 'content',
            },
            modules: [
              {
                type    : 'text-module',
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                // eslint-disable-next-line max-len
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                variant : [],
              },
              {
                type    : 'text-module',
                headline: 'Some headline',
                variant : [],
                text    : [
                  'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                  'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                ],
              },
              {
                type    : 'text-module',
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                // eslint-disable-next-line max-len
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                variant : [],
              },
              {
                type    : 'text-module',
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                // eslint-disable-next-line max-len
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                variant : [],
              },
            ],
          },
          content1: {
            id: 'content1',
            settings: {
              title      : 'Content #1 Title',
              description: 'Description for Content #1',
            },
            modules: [
              {
                type       : 'event-module',
                variant    : [],
                artist     : 'Berliner Ensemble',
                name       : 'Macy Gray and The California Jet Club',
                location   : '',
                description: 'gal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                textblock  : {
                  text: [
                    'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                    'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                  ],
                },
                media: {
                  type     : 'image',
                  source   : [],
                  alt      : 'IMAGE ALT',
                  src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
                  copyright: '© lilaquadrat',
                },
                list: {
                  value: [
                    'Beginn 16:00 Uhr (Einlass 15:00 Uhr)',
                    'Artist Support Fee: 25€'
                  ]
                },
                links: {
                  value: [
                    {
                      link: 'http://www.berliner.com',
                      text: 'Tickets are available for purchase online at http://www.berliner.com'
                    }
                  ],
                },
                link: {
                  link: 'Eventslocation',
                },
              },
            ],
          },
          video2: {
            id: 'video2',
            settings: {
              title      : 'Video #2 Title',
              description: 'Description for Video #2',
            },
            modules: [
              {
                type : 'video-module',
                video: {
                  src : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/introfinal.mp4',
                },
                poster: {
                  source: [],
                  alt   : 'IMAGE ALT',
                  src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_fiery_color_002-2.jpg'
                },
                textblock: {
                  headline: 'VIDEO3',
                  subline : 'play this video',
                },
                variant: [],
              },
            ],
          },
        },
      }
    },  
    {
      type     : 'training-module',
      variant: ['indexVariant'],
      genericData: {
        editor: ['video1', 'content1', 'video2'],
        data: {
          video1: {
            id: 'video1',
            settings: {
              title      : 'Video #1 Title',
              description: 'Description for Video #1',
              mode       : 'content',
            },
            modules: [
              {
                type    : 'text-module',
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                // eslint-disable-next-line max-len
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                variant : [],
              },
              {
                type    : 'text-module',
                headline: 'Some headline',
                variant : [],
                text    : [
                  'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                  'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                ],
              },
              {
                type    : 'text-module',
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                // eslint-disable-next-line max-len
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                variant : [],
              },
              {
                type    : 'text-module',
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                // eslint-disable-next-line max-len
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                variant : [],
              },
            ],
          },
          content1: {
            id: 'content1',
            settings: {
              title      : 'Content #1 Title',
              description: 'Description for Content #1',
            },
            modules: [
              {
                type       : 'event-module',
                variant    : [],
                artist     : 'Berliner Ensemble',
                name       : 'Macy Gray and The California Jet Club',
                location   : '',
                description: 'gal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                textblock  : {
                  text: [
                    'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                    'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                  ],
                },
                media: {
                  type     : 'image',
                  source   : [],
                  alt      : 'IMAGE ALT',
                  src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
                  copyright: '© lilaquadrat',
                },
                list: {
                  value: [
                    'Beginn 16:00 Uhr (Einlass 15:00 Uhr)',
                    'Artist Support Fee: 25€'
                  ]
                },
                links: {
                  value: [
                    {
                      link: 'http://www.berliner.com',
                      text: 'Tickets are available for purchase online at http://www.berliner.com'
                    }
                  ],
                },
                link: {
                  link: 'Eventslocation',
                },
              },
            ],
          },
          video2: {
            id: 'video2',
            settings: {
              title      : 'Video #2 Title',
              description: 'Description for Video #2',
            },
            modules: [
              {
                type : 'video-module',
                video: {
                  src : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/introfinal.mp4',
                },
                poster: {
                  source: [],
                  alt   : 'IMAGE ALT',
                  src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_fiery_color_002-2.jpg'
                },
                textblock: {
                  headline: 'VIDEO3',
                  subline : 'play this video',
                },
                variant: [],
              },
            ],
          },
        },
      }
    },  
    {
      type     : 'training-module',
      variant: ['indexIndicator'],
      genericData: {
        editor: ['video1', 'content1', 'video2'],
        data: {
          video1: {
            id: 'video1',
            settings: {
              title      : 'Video #1 Title',
              description: 'Description for Video #1',
              mode       : 'content',
            },
            modules: [
              {
                type    : 'text-module',
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                // eslint-disable-next-line max-len
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                variant : [],
              },
              {
                type    : 'text-module',
                headline: 'Some headline',
                variant : [],
                text    : [
                  'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                  'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                ],
              },
              {
                type    : 'text-module',
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                // eslint-disable-next-line max-len
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                variant : [],
              },
              {
                type    : 'text-module',
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                // eslint-disable-next-line max-len
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                variant : [],
              },
            ],
          },
          content1: {
            id: 'content1',
            settings: {
              title      : 'Content #1 Title',
              description: 'Description for Content #1',
            },
            modules: [
              {
                type       : 'event-module',
                variant    : [],
                artist     : 'Berliner Ensemble',
                name       : 'Macy Gray and The California Jet Club',
                location   : '',
                description: 'gal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                textblock  : {
                  text: [
                    'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                    'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                  ],
                },
                media: {
                  type     : 'image',
                  source   : [],
                  alt      : 'IMAGE ALT',
                  src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
                  copyright: '© lilaquadrat',
                },
                list: {
                  value: [
                    'Beginn 16:00 Uhr (Einlass 15:00 Uhr)',
                    'Artist Support Fee: 25€'
                  ]
                },
                links: {
                  value: [
                    {
                      link: 'http://www.berliner.com',
                      text: 'Tickets are available for purchase online at http://www.berliner.com'
                    }
                  ],
                },
                link: {
                  link: 'Eventslocation',
                },
              },
            ],
          },
          video2: {
            id: 'video2',
            settings: {
              title      : 'Video #2 Title',
              description: 'Description for Video #2',
            },
            modules: [
              {
                type : 'video-module',
                video: {
                  src : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/introfinal.mp4',
                },
                poster: {
                  source: [],
                  alt   : 'IMAGE ALT',
                  src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_fiery_color_002-2.jpg'
                },
                textblock: {
                  headline: 'VIDEO3',
                  subline : 'play this video',
                },
                variant: [],
              },
            ],
          },
        },
      }
    }  
  ],
};

export default content;