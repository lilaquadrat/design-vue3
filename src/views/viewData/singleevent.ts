import type { Content } from '@lilaquadrat/interfaces';
import dayjs from 'dayjs';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode: 'presentation'
  },
  state  : 'publish',
  modules: [
    {
      type     : 'singleevent-module',
      variant  : [],
      //   startDate: '2019-12-04T15:30:02.561+00:00',
      //   endDate  : '2019-12-05T18:00:02.561+00:00',
      textblock: {
        headline: 'Berliner EnseMacy Gray and The California Jet Club',
        subline : 'Berliner Ensemble',
        intro   : dayjs('2019-12-04T15:30:02.561+00:00').format('HH:mm') + ' : ' + dayjs('2019-12-05T18:00:02.561+00:00').format('HH:mm'),
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln',
          'hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung',
          'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – ',
          'egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich).',
          'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – ',
          'egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). '
        ],
      },
      details: {
        headline: 'Tickets are available for purchase online at',
        subline : 'www.berliner.com',
        intro   : 'Artist Support Fee: 25€',
        text    : [ 'Artist Support Fee: 25€'],
      },
      video: {
        src       : 'https://www.youtube.com/watch?v=JXGUf6oIqco',
        attributes: [],
        preload   : 'auto',
      },
      link: {
        link: 'Eventslocation',
      },
    }
  ]
};

export default content

