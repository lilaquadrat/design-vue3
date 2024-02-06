/** 
fehlermeldung: Module '"/Users/leticjansiama/Desktop/lila2/lila-studio-design-vuejs3/node_modules/dayjs/index"' can only be default-imported using the 'esModuleInterop' flagts(1259)
index.d.ts(3, 1): This module is declared with 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.

Lösung: im tsconfigFile: 
{
  "compilerOptions": {
    "esModuleInterop": true,
}
einfügen
*/
import dayjs from 'dayjs';
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
      },
      list: {
        value: [
          'Entry with some longer text',
          'Normal entry',
          'entry 3',
          'entry 4',
          'entry 5',
        ]
      },
      date   : dayjs().format('DD.MM.YYYY'),
      picture: {
        source   : [],
        alt      : 'IMAGE ALT',
        src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
        copyright: '© lilaquadrat',
      },
    },
    {
      type     : 'timeline-module',
      variant  : [],
      textblock: {
        headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
        subline : 'Der Support ist inklusive.',
        intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
      },
      video: {
        src       : 'https://www.youtube.com/watch?v=T0fTCDxudvE',
        attributes: [],
      }
    },
  ],
};
    