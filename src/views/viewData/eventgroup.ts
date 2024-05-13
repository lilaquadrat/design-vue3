import type { Content } from '@lilaquadrat/interfaces';
import dayjs from 'dayjs';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'Eventgroup',
    description: 'Multible Singleevents'
  },
  state  : 'publish',
  modules: [
    {
      type     : 'eventgroup-module',
      variant  : [],
      textblock: {
        headline: 'EVENT SCHEDULE'
      },
      elements: [
        {
          artist     : 'Berliner Ensemble',
          name       : 'Macy Gray and The California Jet Club',
          location   : 'Essener Str. 100, 04358 Leipzig',
          description: 'gal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          start      : '2024-04-26T17:00:00.373Z',
          end        : '2024-04-26T19:00:00.373Z',
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
          artist     : 'Berliner Ensemble 2',
          name       : 'Macy Gray and The California Jet Club',
          location   : 'Essener Str. 100, 04358 Leipzig',
          description: 'gal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          start      : '2024-04-26T17:00:00.373Z',
          end        : '2024-04-29T19:00:00.373Z',
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
          artist     : 'Berliner Ensemble 1',
          name       : 'Macy Gray and The California Jet Club',
          location   : 'Essener Str. 100, 04358 Leipzig',
          description: 'gal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          start      : '2024-04-26T17:30:00.373Z',
          end        : '2024-04-26T19:30:00.373Z',
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
          artist     : 'The Holographs',
          name       : 'Holographic Symphony',
          location   : 'Virtual Venue',
          description: 'Experience a live symphony orchestra performance in a completely virtual setting.',
          start      : '2024-06-10T19:00:00.000Z',
          end        : '2024-06-10T21:00:00.000Z',
          list       : {
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
          artist     : 'The Holographs',
          name       : 'Holographic Symphony',
          location   : 'Virtual Venue',
          description: 'Experience a live symphony orchestra performance in a completely virtual setting.',
          start      : '2024-06-10T19:00:00.000Z',
          end        : '2024-06-12T21:00:00.000Z',
          list       : {
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
          artist     : 'Jazz Collective',
          name       : 'Jazz Under the Stars',
          location   : 'Open Air, Central Park, New York',
          description: 'Enjoy a serene night of jazz outdoors under the starry sky.',
          start      : '2024-07-15T21:00:00.000Z',
          end        : '2024-07-16T00:00:00.000Z',
          list       : {
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
          artist     : 'Indie Rockers',
          name       : 'Indie Festival 2023',
          location   : 'Downtown Club, San Francisco',
          description: 'A lineup of top indie bands, showcasing new albums and classic hits.',
          start      : '2024-08-20T18:00:00.000Z',
          end        : '2024-08-20T23:00:00.000Z',
          list       : {
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
    }
  ]
};

export default content

