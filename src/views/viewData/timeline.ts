/** 
fehlermeldung: Module '"/Users/leticjansiama/Desktop/lila2/lila-studio-design-vuejs3/node_modules/dayjs/index"' can only be default-imported using the 'esModuleInterop' flagts(1259)
index.d.ts(3, 1): This module is declared with 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.

Lösung: im tsconfigFile: 
{
  "compilerOptions": {
    "esModuleInterop": true,
}
einfügen, zwar eingefügt seit dem rendert l
*/
import dayjs from 'dayjs';
import 'dayjs/locale/de'
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
      type     : 'timeline-module',
      variant: ['mediaLeft'],
      textblock: {
        headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
        subline : 'Der Support ist inklusive.',
        intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
        text    : [
            'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.' ,
            'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich).',
            'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          ],
      },
      date   : dayjs().format('YYYY DD, MMMM'),
      elements: [
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/rectangle1.png',
          },
          links: {
            value: [
              {text: 'more', link: '#more'},
              {text: 'Link 1', link: '/link1'},
              {text: 'Link empty'},
              {text: 'Link 2', link: '/link1'},
            ],
          },
        },
      ],
    },
     {
      type     : 'timeline-module',
      variant: ['mediaRightImage',],
      textblock: {
        headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
        subline : 'Der Support ist inklusive.',
        intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
        text    : [
            'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.' ,
            'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich).',
            'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
            // 'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
            // 'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          ],
      },
      date   : dayjs().format('YYYY DD, MMMM'),

      elements: [
        { 
          
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/rectangle2.png',
         
          }
         
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/rectangle3.png',
          }
        },
        {
          video: {
            src: 'https://www.youtube.com/watch?v=T0fTCDxudvE',
            attributes: [],
            preload: 'auto',
           
          }
        },
        // {
        //   video: {
        //     src: 'https://www.youtube.com/watch?v=TZE9gVF1QbA',
        //     attributes: [],
        //     preload: 'auto',
           
        //   }
        // }, {
        //   video: {
        //     src: 'https://www.youtube.com/watch?v=T0fTCDxudvE',
        //     attributes: [],
        //     preload: 'auto',
           
        //   }
        // }
      ],
    },
    {
      type     : 'timeline-module',
      variant: ['noMedia'],
      textblock: {
        headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
        subline : 'Der Support ist inklusive.',
        intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
        text    : [
            'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.' ,
            'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich).',
            'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
            // 'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
            // 'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          ],
      },
      date   : dayjs().format('YYYY DD, MMMM'),
    },
    {
      type     : 'timeline-module',
      variant: ['noMedia'],
      textblock: {
        subline : 'Der Support ist inklusive.',
        intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
        text    : [
            'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.' ,
            'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich).',
            'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
            // 'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
            // 'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          ],
      },
      
      date   : dayjs().format('YYYY DD, MMMM'),
    },
    {
      type     : 'timeline-module',
      variant: ['mediaLeft'],
      textblock: {
        headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
        subline : 'Der Support ist inklusive.',
        intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
        text    : [
            'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.' ,
            'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich).',
            'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
            // 'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
            // 'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          ],
      },
      date   : dayjs().format('YYYY DD, MMMM'),

      elements: [
        {
          video: {
            src: 'https://www.youtube.com/watch?v=T0fTCDxudvE',
            attributes: [],
            preload: 'auto',
           
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/rectangle3.png',
          }
        },
      ],
    },
    {
      type     : 'timeline-module',
      variant: ['noMedia'],
      textblock: {
        intro : '"12. There will come a day, much quicker than your parents would wish, when you will no longer be comfortable living at home. You will want to move out and establish a home of your own. After that time, your mother and father will be more like your friends than your parents. And someday, if they live long enough, you will be more like a parent to them than a son or daughter."',
      },
      
      date   : dayjs().format('YYYY DD, MMMM'),
    },
    {
      type     : 'timeline-module',
      variant: ['mediaRightVideo',],
      textblock: {
        headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
        subline : 'Der Support ist inklusive.',
        intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
        text    : [
            'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.' ,
            'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich).',
        ]
      },
      date   : dayjs().format('YYYY DD, MMMM'),

      elements: [
        
        // {
        //   video: {
        //     src: 'https://www.youtube.com/watch?v=T0fTCDxudvE',
        //     attributes: [],
        //     preload: 'auto',
           
        //   }
        // },
        // {
        //   video: {
        //     src: 'https://www.youtube.com/watch?v=TZE9gVF1QbA',
        //     attributes: [],
        //     preload: 'auto',
           
        //   }
        // }, 
        {
          video: {
            src: 'https://www.youtube.com/watch?v=TZE9gVF1QbA',
            attributes: [],
            preload: 'auto',
           
          }
        },
      ],
    },
  ],
};
    