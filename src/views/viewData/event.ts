import type { Content } from '@lilaquadrat/interfaces';
import dayjs from 'dayjs';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'Event',
    description: 'Single Event with video and text details'
  },
  state  : 'publish',
  modules: [
    {
      type       : 'event-module',
      variant    : [],
      artist     : 'Berliner Ensemble',
      name       : 'Macy Gray and The California Jet Club',
      location   : 'Essener Str. 100, 04358 Leipzig',
      description: 'gal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
      start      : dayjs().add(4, 'hours'),
      end        : dayjs(),
      textblock  : {
        text: [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        ],
      },
      video: {
        src       : 'https://www.youtube.com/watch?v=JXGUf6oIqco',
        attributes: ['controls'],
        preload   : 'auto',
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
    {
      type       : 'event-module',
      variant    : [],
      artist     : 'Berliner Ensemble',
      name       : 'Macy Gray and The California Jet Club',
      location   : '',
      description: 'gal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
      start      : dayjs().add(4, 'hours'),
      end        : dayjs(),
      textblock  : {
        text: [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        ],
      },
      picture: {
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
    {
      type       : 'event-module',
      variant    : [],
      artist     : 'Berliner Ensemble',
      name       : 'Macy Gray and The California Jet Club',
      location   : '',
      description: 'gal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
      start      : dayjs().add(4, 'hours'),
      end        : dayjs(),
      textblock  : {
        text: [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        ],
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
    }
  ]
};

export default content

