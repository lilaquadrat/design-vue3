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
      // list: {
      //     value: [
      //     'Entry with some longer text',
      //     'Normal entry',
      //     'entry 3',
      //     'entry 4',
      //     'entry 5',
      //     ]
      // },
      date   : dayjs().format('YYYY DD, MMMM'),
      picture: {
        source   : [],
        alt      : 'IMAGE ALT',
        src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/rectangle1.png',
        copyright: '',
      },
    },
    //     {
    //         type     : 'timeline-module',
    //         variant: [],
    //         textblock: {
    //             headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
    //             subline : 'Der Support ist inklusive.',
    //             intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
    //             },
    //         video: {
    //             src   : 'https://www.youtube.com/watch?v=T0fTCDxudvE',
    //             attributes: [],
    //         }
    //   },
  ],
};
    