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
        // eslint-disable-next-line max-len
        text    : ['Welcome to our online ticket reservation platform. Whether you re planning a night out at the theater, attending a concert, or looking forward to a sports event, securing your tickets has never been easier. Our user-friendly form ensures a smooth reservation experience, allowing you to secure your spot at your desired event in just a few clicks.'],
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
                id    : 'standard',
                name  : 'standard',
                amount: 15,
                price : {
                  currency: 'euro',
                  amount  : 45,
                  tax     : 19,
                },
              },
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
                contentId: 'layout-test',
                required : true,
              },
              {
                text     : 'sdrtfgrfgh',
                contentId: 'pdftest',
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
    }
      
  ],
};