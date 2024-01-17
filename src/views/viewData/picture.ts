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
    ],
  };