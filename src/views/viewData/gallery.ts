import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'Gallery',
    description: 'Slide through multiple Images'
  },
  state  : 'publish',
  modules: [
    {
      type     : 'gallery-module',
      textblock: {
        headline: 'Gallery Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      variant : [ 'fullscreen'],
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
      type     : 'gallery-module',
      textblock: {
        headline: 'Gallery Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      variant : [ 'fullscreen', 'variant2'],
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
      type     : 'gallery-module',
      textblock: {
        headline: 'Gallery Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      variant : [ 'variant2'],
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
      type     : 'gallery-module',
      textblock: {
        headline: 'Gallery Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      variant : [ 'simpleIndicator'],
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
      type     : 'gallery-module',
      textblock: {
        headline: 'Gallery Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      variant : [ 'disableControls'],
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
      type     : 'gallery-module',
      textblock: {
        headline: 'Gallery Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      variant : ['disableOverlay'],
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
      type     : 'gallery-module',
      textblock: {
        headline: 'Gallery Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique et egestas quis. Nisi est sit amet facilisis magna.',
      },
      variant : ['fullscreen', 'variant2', 'simpleIndicator'],
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
  ],
};

export default content;