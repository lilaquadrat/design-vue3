import type { Content } from '@lilaquadrat/interfaces';
import dayjs from 'dayjs';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'Blog Intro',
    description: 'As intro for a bigger blog post'
  },
  state  : 'publish',
  modules: [
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
  ],
};

export default content;