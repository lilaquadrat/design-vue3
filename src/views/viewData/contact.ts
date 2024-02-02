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
      type     : 'contact-module',
      textblock: {
        headline: 'Reserve your spot',
        text    : ['Welcome to our online ticket reservation platform. Whether you re planning a night out at the theater, attending a concert, or looking forward to a sports event, securing your tickets has never been easier. Our user-friendly form ensures a smooth reservation experience, allowing you to secure your spot at your desired event in just a few clicks.'],
      },
      editor: {
        modes: ['feedback']
      },
      categoryTextblock: {
        headline: 'Select your Category',
        text    : ['You can decide which category you want to use.'],
      },
      variant    : [],
      genericData: {
        data: {
          1: {
            _id        : '6464c12d074ca92142352b64',
            name       : 'Neue Liste Test',
            description: 'gute beschreibung1212',
            payment    : 'optional',
            state      : 'open',
            mode       : 'contact',
            categories : [
              {
                'id'         : 'standard',
                'name'       : 'Premium Package',
                'description': 'Premium subscription package with additional features',
                'amount'     : 20,
                'price'      : {'currency': 'euro', 'amount': 60, 'tax': 19}
              },
              {
                'id'         : 'basic',
                'name'       : 'Basic Package',
                'description': 'Basic subscription package with standard features',
                'amount'     : 10,
                'price'      : {'currency': 'euro', 'amount': 30, 'tax': 19}
              }
            ],
            company: 'company',
            project: 'project',
            history: {
              version: 18,
              created: '2023-05-17T11:57:33.982Z',
              source : 'lists-app',
              updated: '2023-10-20T15:06:10.507Z',
            },
            participants: {
              max      : 15,
              confirmed: 2,
              available: true,
            },
            agreements: [
              {
                contentId : 'contact-dsgvo',
                predefined: true,
                text      : 'Ich stimme zu, dass meine persönlichen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) verarbeitet werden dürfen. Ich habe die Datenschutzrichtlinie gelesen und verstanden.',
                required  : true,
              },
              {
                text     : 'adfasdf',
                contentId: '648839a1406f871021a3d874',
                required : true,
              },
              {
                text     : 'layout test',
                contentId: 'layout-test',
                required : true,
              },
              {
                text     : 'sdrtfgrfgh',
                contentId: '648839a1406f871021a3d874',
              },
            ],
          },
          2: {
            modules: [
              {
                type    : 'text-module',
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                text    : [
                  // eslint-disable-next-line max-len
                  'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  // eslint-disable-next-line max-len
                  'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                ],
                list: {
                  value: [
                    'Entry with some longer text',
                    'Normal entry',
                    'entry 3',
                    'entry 4',
                    'entry 5',
                  ],
                  title: 'some nice list',
                },
              },
              {
                type     : 'picture-module',
                textblock: {
                  headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                  intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
                },
                picture: {
                  source: [],
                  alt   : 'IMAGE ALT',
                  src   : 'women2.jpg',
                },
                variant: ['textPictureVertical'],
              },
            ],
          },
        },
        lists : [1],
        editor: [2],
      },
    },
    {
      type     : 'contact-module',
      textblock: {
        headline: 'Contact Module',
        text    : ['Wir nutzen Cookies und Pixel um Dir die bestmögliche Browsing-Erfahrung zu bieten. Die mit Hilfe von Cookies und Pixeln gesammelten Daten werden zur Optimierung unserer Webseite genutzt. Diese Daten werden im Rahmen unserer EU-weiten und globalen Tätigkeiten genutzt.'],
      },
      categoryTextblock: {
        headline: 'Select your Category',
        text    : ['You can decide which category you want to use.'],
      },
      variant    : [],
      genericData: {
        data: {
          1: {
            _id         : '6464c12d074ca92142352b64',
            name        : 'Liste 12',
            description : 'fasfdd',
            payment     : 'free',
            state       : 'open',
            mode        : 'reservation',
            participants: {
              max: 10
            },
            categories: [
              {
                'id'         : 'id-base',
                'name'       : 'Base',
                'description': 'Basic access package, ideal for individual users. Includes standard features and support.',
                'amount'     : 25,
                'price'      : {
                  'currency': '€',
                  'amount'  : 29.99,
                  'tax'     : 19
                }
              },
              {
                'id'         : 'test1',
                'name'       : 'Anfrage',
                'description': 'On-demand query service. Pay per use, ideal for sporadic data analysis needs.',
                'amount'     : 5,
                'price'      : {
                  'currency': '€',
                  'amount'  : 9.99,
                  'tax'     : 19
                }
              },
              {
                'id'         : 'string',
                'name'       : 'Hilfe - string',
                'description': 'Extended support package. Includes 24/7 customer service and personalized assistance.',
                'amount'     : 2,
                'price'      : {
                  'currency': '€',
                  'amount'  : 19.99,
                  'tax'     : 19
                }
              },
              {
                'id'         : 'string1',
                'name'       : 'Hilfe not available',
                'description': 'Extended support package. Includes 24/7 customer service and personalized assistance.',
                'disabled'   : true,
                'price'      : {
                  'currency': '€',
                  'amount'  : 0,
                  'tax'     : 19
                }
              }
            ],
            agreements: [
              {
                'contentId' : 'contact-dsgvo',
                'predefined': true,
                'text'      : 'Ich stimme zu, dass meine persönlichen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) verarbeitet werden dürfen. Ich habe die Datenschutzrichtlinie gelesen und verstanden.',
                'required'  : true
              },
              {
                'text'     : 'Bitte geben Sie Ihre Meinung zu unserem Service an.',
                'contentId': '6178122af0a16e35ec1f3ea1',
                'required' : true
              },
              {
                'text'     : 'Haben Sie Verbesserungsvorschläge für uns?',
                'contentId': '648839a1406f871021a3d874',
                'required' : false
              },
              {
                'text'     : 'Teilen Sie uns Ihre Erfahrungen mit unserem Produkt mit.',
                'contentId': '648839a1406f871021a3d874',
                'required' : false
              }
            ],
            company: 'lilaquadrat',
            project: 'homepage',
            history: {
              version: 4,
              created: '2023-08-25T12:42:59.228Z',
              source : 'lists-app',
              updated: '2023-08-25T16:24:16.289Z',
            },
          },
        },
        lists: [1],
      },
    }
  ],
};