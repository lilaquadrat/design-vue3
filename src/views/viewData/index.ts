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