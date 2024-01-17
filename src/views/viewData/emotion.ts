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
  ],
};
  