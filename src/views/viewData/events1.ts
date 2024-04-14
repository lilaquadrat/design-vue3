import type { Content } from '@lilaquadrat/interfaces';

import dayjs from 'dayjs';
import 'dayjs/locale/de'

const content: Content = {
    id: 'home',
    company: 'company',
    project: 'project',
    settings: {
        mode: 'presentation'
    },
    state: 'publish',
    modules: [
        {
            type: 'events-module',
            variant: [],
            textblock: {
                headline: 'EVENT SCHEDULE'
            },
            elements: [
                date: '2019-11-08T11:49:02.561+00:00',
                {
                    // startdate endData nur für die Anzeige wichtig
                    startDate: '2019-11-08T11:49:02.561+00:00',
                    endDate: '2019-11-08T11:49:02.561+00:00',
                    textblock: {
                        headline: 'Macy Gray and The California Jet Club',
                        subline: 'Until 16 March 2024',
                        intro: '18:00 - 20:00',
                        text: [
                            'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                        ],
                    },
                    link: [
                        { text: 'Eventslocation', link: 'https://www.google.de/?hl=de' },
                    ],
                    moreText:
                        [{
                            text: 'more Text',
                            link: '/event-content',
                            target: 'blank'
                        }
                        ]
                    ,
                    icon: 'location',
                    picture:
                    {
                        source: [],
                        alt: 'IMAGE ALT',
                        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/instrument.png',
                    }
                },
                {

                    textblock: {
                        headline: 'Macy Gray and The California Jet Club',
                        subline: 'Until 16 March 2024',
                        intro: '8:00 - 10:00',
                        text: [
                            'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                        ],
                    },
                    link: [
                        { text: 'Eventslocation', link: 'https://www.google.de/?hl=de' },
                    ],
                    moreText:
                        [{
                            text: 'more Text',
                            link: '/event-content',
                            target: 'blank'
                        }
                        ]
                    ,
                    icon: 'location',
                    picture:
                    {
                        source: [],
                        alt: 'IMAGE ALT',
                        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/mic.png',
                    }
                },
                ,
                {
                    textblock: {
                        headline: 'Macy Gray and The California Jet Club',
                        subline: 'Until 16 March 2024',
                        intro: '8:00 - 10:00',
                        text: [
                            'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                        ],
                    },
                    link: [
                        { text: 'Eventslocation', link: 'https://www.google.de/?hl=de' },
                    ],
                    moreText:
                        [{
                            text: 'more Text',
                            link: '/event-content',
                            target: 'blank'
                        }
                        ]
                    ,
                    icon: 'location',
                    picture:
                    {
                        source: [],
                        alt: 'IMAGE ALT',
                        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/instrument.png',
                    }
                },
                {
                    textblock: {
                        headline: 'Macy Gray and The California Jet Club',
                        subline: 'Until 16 March 2024',
                        intro: '10:00 - 12:00',
                        text: [
                            'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                        ],
                    },
                    link: [
                        { text: 'Eventslocation', link: 'https://www.google.de/?hl=de' },
                    ],
                    moreText:
                        [{
                            text: 'more Text',
                            link: '/somemoreText',
                            target: 'blank',

                        }]
                    ,
                    icon: 'location',
                    picture:
                    {
                        source: [],
                        alt: 'IMAGE ALT',
                        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/sidemusician.jpg',
                    }
                },
                {
                    date: '06 SO',
                    textblock: {
                        headline: 'Percy and the Olympics',
                        subline: 'Until 16 March 2024',
                        intro: '18:00 - 20:00',
                        text: [
                            'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                        ],
                    },
                    link: [
                        { text: 'Eventslocation', link: 'https://www.google.de/?hl=de' },
                    ],
                    moreText:
                        [{
                            text: 'more Text',
                            link: '/somemoreText',
                            target: 'blank',

                        }]
                    ,
                    icon: 'location',
                    picture:
                    {
                        source: [],
                        alt: 'IMAGE ALT',
                        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/frontmusician.png',
                    }
                },
                {
                    textblock: {
                        headline: 'Macy Gray and The California Jet Club',
                        subline: 'Until 16 March 2024',
                        intro: '8:00 - 10:00',
                        text: [
                            'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                        ],
                    },
                    link: [
                        { text: 'Eventslocation', link: 'https://www.google.de/?hl=de' },
                    ],
                    moreText:
                        [{
                            text: 'more Text',
                            link: '/event-content',
                            target: 'blank'
                        }
                        ]
                    ,
                    icon: 'location',
                    picture:
                    {
                        source: [],
                        alt: 'IMAGE ALT',
                        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/instrument.png',
                    }
                },
                {
                    textblock: {
                        headline: 'Macy Gray and The California Jet Club',
                        subline: 'Until 16 March 2024',
                        intro: '10:00 - 12:00',
                        text: [
                            'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                        ],
                    },
                    link: [
                        { text: 'Eventslocation', link: 'https://www.google.de/?hl=de' },
                    ],
                    moreText:
                        [{
                            text: 'more Text',
                            link: '/somemoreText',
                            target: 'blank',

                        }]
                    ,
                    icon: 'location',
                    picture:
                    {
                        source: [],
                        alt: 'IMAGE ALT',
                        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/sidemusician.jpg',
                    }
                },
                {
                    date: '06 SO',
                    textblock: {
                        headline: 'Percy and the Olympics',
                        subline: 'Until 16 March 2024',
                        intro: '18:00 - 20:00',
                        text: [
                            'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                        ],
                    },
                    link: [
                        { text: 'Eventslocation', link: 'https://www.google.de/?hl=de' },
                    ],
                    moreText:
                        [{
                            text: 'more Text',
                            link: '/somemoreText',
                            target: 'blank',

                        }]
                    ,
                    icon: 'location',
                    picture:
                    {
                        source: [],
                        alt: 'IMAGE ALT',
                        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/frontmusician.png',
                    }
                },
                {
                    textblock: {
                        headline: 'Macy Gray and The California Jet Club',
                        subline: 'Until 16 March 2024',
                        intro: '10:00 - 12:00',
                        text: [
                            'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                        ],
                    },
                    link: [
                        { text: 'Eventslocation', link: 'https://www.google.de/?hl=de' },
                    ],
                    moreText:
                        [{
                            text: 'more Text',
                            link: '/event-content',
                            target: 'blank'
                        }
                        ]
                    ,
                    icon: 'location',
                    picture:
                    {
                        source: [],
                        alt: 'IMAGE ALT',
                        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/sidemusician.jpg',
                    }
                },
                {
                    textblock: {
                        headline: 'Macy Gray and The California Jet Club',
                        subline: 'Until 16 March 2024',
                        intro: '14:00 - 16:00',
                        text: [
                            'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                        ],
                    },
                    link: [
                        { text: 'Eventslocation', link: 'https://www.google.de/?hl=de' },
                    ],
                    moreText:
                        [{
                            text: 'more Text',
                            link: '/event-content',
                            target: 'blank'
                        }
                        ]
                    ,
                    icon: 'location',
                    picture:
                    {
                        source: [],
                        alt: 'IMAGE ALT',
                        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/mic.png',
                    }
                }, {
                    textblock: {
                        headline: 'Macy Gray and The California Jet Club',
                        subline: 'Until 16 March 2024',
                        intro: '80:00 - 12:00',
                        text: [
                            'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                        ],
                    },
                    link: [
                        { text: 'Eventslocation', link: 'https://www.google.de/?hl=de' },
                    ],
                    moreText:
                        [{
                            text: 'more Text',
                            link: '/event-content',
                            target: 'blank'
                        }
                        ]
                    ,
                    icon: 'location',
                    picture:
                    {
                        source: [],
                        alt: 'IMAGE ALT',
                        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/mic.png',
                    }
                },
                {
                    textblock: {
                        headline: 'Macy Gray and The California Jet Club',
                        subline: 'Until 16 March 2024',
                        intro: '16:00 - 18:00',
                        text: [
                            'Forever full of ear-tugging/eye-popping surprises, ever-eclectic singer/songwriter and actress Macy Gray returns... '
                        ],
                    },
                    link: [
                        { text: 'Eventslocation', link: 'https://www.google.de/?hl=de' },
                    ],
                    moreText:
                        [{
                            text: 'more Text',
                            link: '/event-content',
                            target: 'blank'
                        }
                        ]
                    ,
                    icon: 'location',
                    picture:
                    {
                        source: [],
                        alt: 'IMAGE ALT',
                        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/frontmusician.png',
                    }
                }

            ],

        }
    ]
};

export default content

/**
Funktion sortiert wenn die dates beide gleich sind, ddann müsste noch ein sollte auch sortieren wenn die beiden zwar unterschiedlich sind, aber die Veranstaltug am selben Tag stattfindet

function setElements (elements: Event[]) {

  elements.sort((a, b) => a.date.localeCompare(b.date));

  elements.forEach(single => {
    if (single.date === elements[0].date) {
      single.elements.sort((a: any, b: any) => a.startDate.localeCompare(b.startDate));
    }
  });
}

const eventInfo = computed(() => {
  const info = eventsElements.value.map((single) => ({
    subline: single.textblock?.subline,
    intro  : single.textblock?.intro
  }));
  
  console.log(info);
  
  return info;
});
*/

