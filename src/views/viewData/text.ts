import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'Text',
    description: 'Text for general usage'
  },
  state  : 'publish',
  modules: [
    {
      type    : 'text-module',
      variant : [],
      headline: 'some headline',
      subline : 'some subline',
      intro   : 'some intro',
      text    : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
      ],
      links: {
        value: [
          {text: 'more', link: '#more'},
          {text: 'Link 1', link: '/link1'},
          {text: 'Link empty'},
          {text: 'Link 2', link: '/link1'},
        ],
      },
    },
    {
      type    : 'text-module',
      variant : [],
      headline: 'some headline',
      subline : 'some subline',
      intro   : 'some intro',
      text    : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
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
      type    : 'text-module',
      headline: 'Some headline',
      variant : ['center'],
      text    : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). Die Frage nach dem Betriebssystem stellt sich nicht: STUDIO steht für sich und arbeitet unabhängig und immer zuverlässig – egal ob als installierbare Version für den Computer oder als App für Android und iOS (in Kürze erhältlich). ',
      ],
    },
    {
      type    : 'text-module',
      variant : ['notice'],
      headline: 'some headline',
      subline : 'some subline',
      intro   : 'some intro',
      text    : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
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
      type   : 'text-module',
      variant: ['center', 'noStyle'],
      subline: 'Der Support ist inklusive.',
      text   : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        
      ],
      links: {
        value: [
          {text: 'more', link: '#more'},
          {text: 'Link 1', link: '/link1'},
          {text: 'Link empty'},
          {text: 'Link 2', link: '/link1'},
        ],
      },
    },  
    {
      type   : 'text-module',
      variant: ['notice', 'center'],
      subline: 'Der Support ist inklusive.',
      text   : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        
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
  ],
};

export default content;