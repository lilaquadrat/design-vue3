import type { Content } from '@lilaquadrat/interfaces';
import dayjs from 'dayjs';

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
      type     : 'events-module',
      variant  : [],
      textblock: {
        headline: 'EVENT SCHEDULE'
      },
      events: [
        {
          date    : '2019-11-08T11:49:02.561+00:00',
          elements: [
            {
              startDate: '2019-12-04T15:30:02.561+00:00',
              endDate  : '2019-12-05T18:00:02.561+00:00',
              textblock: {
                headline: 'Macy Gray and The California Jet Club',
                subline : `${'Until '}` + dayjs('2019-12-04T15:30:02.561+00:00').format('DD MMMM YYYY'),
                intro   : dayjs('2019-12-04T15:30:02.561+00:00').format('HH:mm') + ' : ' + dayjs('2019-12-05T18:00:02.561+00:00').format('HH:mm'),
                text    : [
                  'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                ],
              },
              link: {
                link: 'Eventslocation',
              },
              moreText:
              {
                text: 'more Text',
                link: '/event-content',

              },
              icon: 'location',
            },
            {
              startDate: '2019-11-24T09:00:02.561+00:00',
              endDate  : '2019-11-24T11:00:02.561+00:00',
              textblock: {
                headline: 'Macy Gray and The California Jet Club',
                subline : `${'Until '}`+dayjs('2019-12-04T15:30:02.561+00:00').format('DD MMMM YYYY'),
                intro   : dayjs('2019-12-04T15:30:02.561+00:00').format('HH:mm') + ' : ' + dayjs('2019-12-05T18:00:02.561+00:00').format('HH:mm'),
                text    : [
                  'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                ],
              },
              link: {
                link: 'Eventslocation',
              },
              moreText:
              {
                text: 'more Text',
                link: '/event-content',

              },
              icon: 'location',
              picture:
              {
                source: [],
                alt   : 'IMAGE ALT',
                src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/mic.png',
              }
            },
          ],
        },
        {
          date    : '2019-11-07T14:00:02.561+00:00',
          elements: [
            {
              startDate: '2019-11-07T14:00:02.561+00:00',
              endDate  : '2019-11-07T16:00:02.561+00:00',
              textblock: {
                headline: 'Macy Gray and The California Jet Club',
                subline : `${'Until '}`+dayjs('2019-12-04T15:30:02.561+00:00').format('DD MMMM YYYY'),
                intro   : dayjs('2019-12-04T15:30:02.561+00:00').format('HH:mm') + ' : ' + dayjs('2019-12-05T18:00:02.561+00:00').format('HH:mm'),
                text    : [
                  'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                ],
              },
              link: {
                link: 'Eventslocation',
              },
              moreText:
              {
                text: 'more Text',
                link: '/event-content',

              },
              icon: 'location',
              picture:
              {
                source: [],
                alt   : 'IMAGE ALT',
                src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/frontmusician.png',
              }
            },
            {
              startDate: '2019-11-07T10:00:02.561+00:00',
              endDate  : '2019-11-07T12:00:02.561+00:00',
              textblock: {
                headline: 'Macy Gray and The California Jet Club',
                subline : `${'Until '}`+dayjs('2019-12-04T15:30:02.561+00:00').format('DD MMMM YYYY'),
                intro   : dayjs('2019-12-04T15:30:02.561+00:00').format('HH:mm') + ' : ' + dayjs('2019-12-05T18:00:02.561+00:00').format('HH:mm'),
                text    : [
                  'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                ],
              },
              link: {
                link: 'Eventslocation',
              },
              moreText:
              {
                text: 'more Text',
                link: '/test',
              }
              ,
              icon: 'location',
              picture:
              {
                source: [],
                alt   : 'IMAGE ALT',
                src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/instrument.png',
              }
            },
          ],
        },
      ],
    }
  ]
};

export default content

