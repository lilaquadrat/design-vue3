<script setup lang="ts">
import { computed } from 'vue';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';
import type { Content } from '@lilaquadrat/studio/lib/interfaces';
import dayjs from 'dayjs';
import useMainStore from '@/stores/main.store';

const store = useMainStore();
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
      type     : 'emotion-module',
      textblock: {
        headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
        subline : 'Der Support ist inklusive.',
        intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
      },
      background: {
        source: [],
        alt   : 'IMAGE ALT',
        src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
      },
    },
    {
      type     : 'emotion-module',
      textblock: {
        headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
        subline : 'Der Support ist inklusive.',
        intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
      },
      background: {
        source: [],
        alt   : 'IMAGE ALT',
        src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
      },
      links: [
        {text: 'Call to Action', variant: ['callToAction'], link: '/link1'},
        {text: 'more', link: '#more'},
        {text: 'Link 1', link: '/link1'},
        {text: 'Link 2', link: '/link1'},
      ],
      variant: ['dark', 'align']
    },
    {
      type     : 'emotion-module',
      textblock: {
        headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
        subline : 'Der Support ist inklusive.',
        intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
      },
      background: {
        source: [],
        alt   : 'IMAGE ALT',
        src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
      },
      links: [
        {text: 'Call to Action', variant: ['callToAction'], link: '/link1'},
        {text: 'more', link: '#more'},
        {text: 'Link 1', link: '/link1'},
        {text: 'Link empty'},
        {text: 'Link 2', link: '/link1'},
      ],
      variant: ['bright', 'height50', 'align']
    },
    {
      type     : 'contact-module',
      textblock: {
        headline: 'Reserve your spot',
        text    : ['Welcome to our online ticket reservation platform. Whether you re planning a night out at the theater, attending a concert, or looking forward to a sports event, securing your tickets has never been easier. Our user-friendly form ensures a smooth reservation experience, allowing you to secure your spot at your desired event in just a few clicks.'],
      },
      author: 'Max Mustermann',
      date  : dayjs().format('DD.MM.YYYY'),
      link  : {
        link: '/test'
      }
    },
    {
      type     : 'blog-intro-module',
      textblock: {
        headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
        subline : 'Der Support ist inklusive.',
        intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
      },
      picture: {
        source: [],
        alt   : 'IMAGE ALT',
        src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
      },
      author: 'Max Mustermann',
      date  : dayjs().format('DD.MM.YYYY'),
    },
    {
      type     : 'blog-intro-module',
      textblock: {
        headline: 'with Link.',
        subline : 'Der Support ist inklusive.',
        intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
      },
      picture: {
        source: [],
        alt   : 'IMAGE ALT',
        src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
      },
      author: 'Max Mustermann',
      date  : dayjs().format('DD.MM.YYYY'),
      link  : {
        link: '/test'
      }
    },
    {
      type     : 'faq-module',
      variant  : [],
      textblock: {
        headline: 'FAQ headline',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        ],
      },
      accordion: {
        elements: [
          {
            textblock: {
              headline: 'FAQ headline',
              text    : [
                'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
              ],
            }
          },
          {
            textblock: {
              headline: 'FAQ headline 1',
              text    : [
                'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
              ],
            }
          },
          {
            textblock: {
              headline: 'FAQ headline 2',
              text    : [
                'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
              ],
            }
          },
        ]
      }
    },
    {
      type     : 'faq-module',
      variant  : [],
      textblock: {
        headline: 'FAQ headline',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        ],
      },
      accordion: {
        multiOpen      : false,
        disableControls: false,
        openOnStart    : 'first',
        elements       : [
          {
            textblock: {
              headline: 'FAQ headline',
              text    : [
                'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
              ],
            }
          },
          {
            textblock: {
              headline: 'FAQ headline 1',
              text    : [
                'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
              ],
            }
          },
          {
            textblock: {
              headline: 'FAQ headline 2',
              text    : [
                'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
              ],
            }
          },
        ]
      }
    },
    {
      type    : 'text-module',
      headline: 'Some headline',
      text    : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
    },
    {
      type     : 'picture-module',
      textblock: {
        intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      picture: {
        source   : [],
        alt      : 'IMAGE ALT',
        src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
        copyright: '© lilaquadrat',
      },
      variant: ['small'],
    },
    {
      type    : 'text-module',
      headline: 'some headline',
      subline : 'some subline',
      intro   : 'some intro',
      text    : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
      ],
    },
    {
      type   : 'text-module',
      subline: 'Der Support ist inklusive.',
      text   : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
    },
    {
      type     : 'gallery-module',
      textblock: {
        headline: 'Gallery Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      variant : [],
      elements: [
        {
          textblock: {
            headline: 'some headline',
            subline : 'some subline',
            intro   : 'some intro',
          },
          picture: {
            source: [],
            alt   : 'IMAGE ALT',
            src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
          },
        },
        {
          picture: {
            source: [],
            alt   : 'IMAGE ALT',
            src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
          },
        },
      ],
    },
    {
      type   : 'text-module',
      subline: 'Jedes Anliegen verdient gehör.',
      text   : [
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
    },
    {
      type     : 'pictureandtext-module',
      textblock: {
        headline: 'with links and fit',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      picture: {
        source   : [],
        alt      : 'IMAGE ALT',
        src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
        copyright: '© lilaquadrat',
      },
      links: {
        value: [
          {text: 'more', link: '#more'},
          {text: 'Link 1', link: '/link1'},
          {text: 'Link empty'},
          {text: 'Link 2', link: '/link1'},
        ],
      },
      variant: ['fit'],
    },
    {
      type     : 'pictureandtext-module',
      textblock: {
        headline: 'pictureTextVertical',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      picture: {
        source   : [],
        alt      : 'IMAGE ALT',
        src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
        copyright: '© lilaquadrat',
      },
      variant: ['switchContent'],
    },
    {
      type     : 'pictureandtext-module',
      textblock: {
        headline: 'pictureTextVertical',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      picture: {
        source   : [],
        alt      : 'IMAGE ALT',
        src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
        copyright: '© lilaquadrat',
      },
      variant: ['focusImage'],
    },
    {
      type     : 'pictureandtext-module',
      textblock: {
        headline: 'pictureTextVertical',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      picture: {
        source   : [],
        alt      : 'IMAGE ALT',
        src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
        copyright: '© lilaquadrat',
      },
      variant: ['switchContent', 'focusImage'],
    },
    {
      type     : 'picturegroup-module',
      textblock: {
        headline: 'with fit',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
      variant: ['fit'],
    },
    {
      type     : 'picturegroup-module',
      textblock: {
        headline: 'four columns with fit',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
      variant: ['fit', 'fourColumns'],
    },
    {
      type     : 'picturegroup-module',
      textblock: {
        headline: 'four columns with fit and links and color',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          link: {
            link: '/test'
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          link: {
            link: '/test'
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
      variant: ['fit', 'fourColumns', 'color1', 'align'],
    },
    {
      type     : 'picturegroup-module',
      textblock: {
        headline: 'four columns with fit and links',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          link: {
            link: '/test'
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          link: {
            link: '/test'
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
      variant: ['fit', 'fourColumns'],
    },
    {
      type     : 'picturegroup-module',
      textblock: {
        headline: 'four columns with fit and links and description',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          link: {
            link: '/test'
          },
          textblock: {
            headline: 'four columns with fit and links and description',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          link: {
            link: '/test'
          },
          textblock: {
            subline: 'four columns with fit and links and description',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          textblock: {
            text: [
              'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
            ],
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
      variant: ['fourColumns', 'color1'],
    },
    {
      type     : 'picturegroup-module',
      textblock: {
        headline: 'four columns with fit and links and description',
        intro   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          link: {
            link: '/test'
          },
          textblock: {
            headline: 'four columns with fit and links and description',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          link: {
            link: '/test'
          },
          textblock: {
            subline: 'four columns with fit and links and description',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          textblock: {
            text: [
              'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
            ],
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
      variant: ['color1'],
    },
    {
      type     : 'picturegroup-module',
      textblock: {
        headline: 'four columns with fit and links and description',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          links: {
            value: [
              {text: '017674715883', link: 'tel:017674715883'},
              {text: 'm.schuebel@lila2.de', link: 'mail:m.schuebel@lila2.de'},
            ],
          },
          textblock: {
            headline: 'Max Mustermann',
            intro   : 'Abteil A',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          links: {
            title: 'contact',
            value: [
              {text: '017674715883', link: 'tel:017674715883'},
              {text: 'm.schuebel@lila2.de', link: 'mail:m.schuebel@lila2.de'},
            ],
          },
          textblock: {
            headline: 'Max Testermann',
            intro   : 'Abteil B',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          links: {
            value: [
              {text: '017674715883', link: 'tel:017674715883'},
              {text: 'm.schuebel@lila2.de', link: 'mail:m.schuebel@lila2.de'},
            ],
          },
          textblock: {
            headline: 'Max Mustermann',
            intro   : 'Abteil C',
          },
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
      variant: ['contact', 'fit'],
    },
    {
      type     : 'picturegroup-module',
      textblock: {
        headline: 'four columns with fit and links and description',
        text    : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      elements: [
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_pistachio-crusted-sea-bream-and-smashed-potatoes-8f3bb02b-d24d4b79.jpg',
            copyright: '© lilaquadrat',
          }
        },
        { 
          picture: {
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_r1.jpg',
            copyright: '© lilaquadrat',
          }
        },
      ],
      variant: ['small', 'fit'],
    },
    {
      type  : 'footer-module',
      legal : 'some legal information',
      social: {
        title   : 'Social',
        elements: [
          {
            link: {
              link: 'https://fb.com',
            },
            picture: {
              source: [],
              alt   : 'IMAGE ALT',
              src   : 'icon-32x32.png',
            },
          },
          {
            link: {
              link: 'https://twitter.com',
            },
            picture: {
              source: [],
              alt   : 'IMAGE ALT',
              src   : 'icon-32x32.png',
            },
          },
        ],
      },
      contact: {
        title: 'Contact',
        link : {
          text: 'Call us: +012283838',
          link: 'tel:012222',
        },
        lists : [1],
        editor: [2],
      },
      sitemap: [
        {
          title   : 'Sitemap 1',
          elements: [
            {
              text: 'Link #1',
              link: '/test',
            },
            {
              text: 'Link #2',
              link: '/test',
            },
            {
              text: 'Link #3',
              link: '/test',
            },
            {
              text: 'Link #4',
              link: '/test',
            },
            {
              text: 'Link #5',
              link: '/test',
            },
          ],
        },
        {
          title   : 'Sitemap 2',
          elements: [
            {
              text: 'Link #1',
              link: '/test',
            },
            {
              text: 'Link #2',
              link: '/test',
            },
            {
              text: 'Link #3',
              link: '/test',
            },
            {
              text: 'Link #4',
              link: '/test',
            },
            {
              text: 'Link #5',
              link: '/test',
            },
          ],
        },
        {
          title   : 'Sitemap 3',
          elements: [
            {
              text: 'Link #1',
              link: '/test',
            },
            {
              text: 'Link #2',
              link: '/test',
            },
            {
              text: 'Link #3',
              link: '/test',
            },
            {
              text: 'Link #4',
              link: '/test',
            },
            {
              text: 'Link #5',
              link: '/test',
            },
          ],
        },
      ],

    },
    {
      type     : 'cookies-module',
      textblock: {
        intro: 'cookies',
        text : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      variant: ['overlay', 'overlayRight'],
    },
    {
      type     : 'cookies-module',
      textblock: {
        intro: 'Some cookies for you.',
        text : [
          'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
          'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        ],
      },
      variant: [],
    },
    {
      type    : 'quote-module',
      quote   : 'thats some nice quote',
      citation: 'thats some nice quote',
      variant : [],
      link    : {
        link: '/test',
        text: 'some link'
      }
    },
    {
      type    : 'quote-module',
      quote   : 'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln.',
      citation: 'thats some nice quote',
      variant : ['quoteRight'],
      link    : {
        link: '/test',
        text: 'some link'
      }
    },
    {
      type    : 'quote-module',
      quote   : 'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln.',
      citation: 'thats some nice quote',
      variant : ['quoteCenter', 'authRight'],
      link    : {
        link: '/test',
        text: 'some link'
      }
    },
    {
      type    : 'quote-module',
      quote   : 'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln.',
      citation: 'thats some nice quote, small',
      variant : ['quoteCenter', 'authRight', 'small'],
      link    : {
        link: '/test',
        text: 'some link'
      }
    },
    {
      type    : 'quote-module',
      quote   : 'Yes',
      citation: 'thats some nice quote',
      variant : ['quoteCenter', 'captionCenter'],
      link    : {
        link: '/test',
        text: 'some link'
      }
    },
    {
      type     : 'index-module',
      variant  : ['backgroundGrey'],
      textblock: {
        headline: 'some headline'
      },
      links: {
        title: 'Auf dieser Seite',
        value: [
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          }
        ]
      }
    },
    {
      type     : 'index-module',
      variant  : ['numbered', 'medium'],
      textblock: {
        headline: 'some headline'
      },
      links: {
        title: 'Auf dieser Seite',
        value: [
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          }
        ]
      }
    },
    {
      type     : 'index-module',
      variant  : ['backgroundColor1'],
      textblock: {
        headline: 'some headline'
      },
      links: {
        title: 'Auf dieser Seite',
        value: [
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          }
        ]
      }
    },
    {
      type     : 'index-module',
      variant  : ['backgroundColor3', 'numbered'],
      textblock: {
        headline: 'some headline'
      },
      links: {
        title: 'Auf dieser Seite',
        value: [
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          },
          {
            link: '/test',
            text: 'some link'
          }
        ]
      }
    },
  ],
};

store.setConfiguration({preloadImages: true})

const contentMerged = computed(() => prepareContent(content)); 

</script>

<template>
    <article class="content-screen screen">
        <lila-content-module linkMode="event" linkBase="/baseurl" :content="contentMerged" />
    </article>
</template>