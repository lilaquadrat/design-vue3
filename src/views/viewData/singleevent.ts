import type { Content } from '@lilaquadrat/interfaces';
import dayjs from 'dayjs';

const startDate = dayjs('2019-05-04T15:30:02.561+00:00')
const endDate = dayjs('2019-05-05T18:00:02.561+00:00')
const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'singleevent',
    description: 'Single Event with video and text details'
  },
  state  : 'publish',
  modules: [
    {
      type   : 'singleevent-module',
      variant: [],
    
      headline: 'Berliner Ensemble',
      subline : `${startDate.locale('de').format('DD MMMM, HH:mm')} - ${endDate.locale('de').format('HH:mm')}`,
      intro   : 'Macy Gray and The California Jet Club',
      text    : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
      video: {
        src       : 'https://www.youtube.com/watch?v=JXGUf6oIqco',
        attributes: ['controls'],
        preload   : 'auto',
      },
      details: {
        headline: 'Tickets are available for purchase online at',
        subline : 'www.berliner.com',
        intro   : ' Artist Support Fee: 25€',
        text    : ['Beginn 16:00 Uhr (Einlass 15:00 Uhr)'],
      },
      link: {
        link: 'Eventslocation',
      },
    },
    {
      type   : 'singleevent-module',
      variant: [],
   
      headline: 'Berliner Ensemble',
      subline : `${startDate.locale('de').format('DD MMMM, HH:mm')} - ${endDate.locale('de').format('DD MMMM, HH:mm')}`,
      intro   : 'Macy Gray and The California Jet Club',
      text    : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
      
      video: {
        src       : 'https://www.youtube.com/watch?v=JXGUf6oIqco',
        attributes: ['controls'],
        preload   : 'auto',
      },
      details: {
        headline: 'Tickets are available for purchase online at',
        subline : 'www.berliner.com',
        intro   : ' Artist Support Fee: 25€',
        text    : ['Beginn 16:00 Uhr (Einlass 15:00 Uhr)'],
      },
      link: {
        link: 'Eventslocation',
      },
    }
  ]
};

export default content

