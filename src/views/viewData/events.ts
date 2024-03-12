
import dayjs from 'dayjs';
import 'dayjs/locale/de'
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
      type    : 'events-module',
      variant : ['hjadshjsdg'],
      textblock:{ 
        headline:'EVENT SCHEDULE'
      },
      date    :   dayjs(),
      elements: [
        {
          date    :   '2345678',
          textblock: {
              headline: 'Macy Gray and The California Jet Club',
              subline: 'Until 16 March 2024',
              intro: '17:00 - 19:00',
              text   : [
                'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
              ],
             },
          link: [
            {text: 'Eventslocation', link: 'https://www.google.de/?hl=de'},
            ],
            moreText: 
              [{
                  text:'more Text', link:'/somemoreText', target: 'blank'
              }]
          ,
          icon: 'location',
          picture: 
              {
                  source: [],
                  alt   : 'IMAGE ALT',
                  src   : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/smalltrompet.png',
                },
      }],
    }, 
  ].map((dayItem, index) => ({
    ...dayItem,
    date: 
       dayjs().add(index, 'day') 
      //  dayjs().add(index, 'day').format('DD) + dayjs().add(index, 'day').locale('de').format('dddd').slice(0,2).toUpperCase()
  })),
};
    
