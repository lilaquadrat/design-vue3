import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
    id: 'home',
    company: 'company',
    project: 'project',
    settings: {
        mode: 'presentation',
        title: 'Location',
        description: 'Get a location from Google Maps'
    },
    state: 'publish',
    modules: [
        {
            type: 'location-module',
            variant: [],
            textblock: {
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                text: [
                    'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  ],
              },
              links: {
                value: [
                  {
                    text: 'Link with some longer text',
                    link: 'https://testlink',
                  },
                  {
                    text: 'Normal link',
                    link: 'https://testlink',
                  },
                ],
                title: 'Follow up links',
              },
        
            map: {
                showMaps: 'Karte anzeigen',
                // textblock: {
                    
                //     text: ['Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ',
                //     ],
                // },
                src: 'https://www.google.com/maps?ll=51.339232,12.375497&z=16&t=m&hl=de&gl=DE&mapclient=embed&cid=1037916888444169928',
            }
        },
        {
            type: 'location-module',
            variant: ['square', 'bright'],
            textblock: {
                headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
                subline : 'Der Support ist inklusive.',
                intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
                text: [
                    'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                  ],
              },
              list: {
                value: [
                  'Entry with some longer text',
                  'Normal entry',
                  'entry 3',
                ],
                title: 'some nice list',
              },
            map: {
                showMaps: 'Show Map',
                textblock: {
                    headline: 'Do you want to see where we are?',
                    subline : 'Click to load the map..',
                },
                src: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6045.723999538163!2d-73.791041!3d40.743062!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c261b47046b9f7%3A0x9924920030f3a637!2s5610%20185th%20St%2C%20Flushing%2C%20NY%2011365%2C%20USA!5e0!3m2!1sde!2sde!4v1717242682956!5m2!1sde!2sde"',
            }
        },
        {
          type: 'location-module',
          variant: [],
          textblock: {
              headline: 'JEDES ANLIEGEN VERDIENT GEHÖR.',
              subline : 'Der Support ist inklusive.',
              intro   : 'STUDIO steht für einmalige Kosten und trotzdem eine langfristige Nutzbarkeit: Jede Lizenzgebühr beinhaltet fünf volle Jahre Support von zertifizierten Mitarbeitern. ',
              text: [
                  'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass.',
                ],
            },
          map: {
              showMaps: 'Show Map',
              background: {
                source: [],
                alt: 'placeholder map Image',
                src: 'https://cdn3.lilaquadrat.de/kuemmelapotheke/kahomepage/kuemmel_apotheke_maps.png',
              },
              textblock: {
                  headline: 'Do you want to see where we are?',
                  subline : 'Click to load the map..',
              },
              src: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6045.723999538163!2d-73.791041!3d40.743062!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c261b47046b9f7%3A0x9924920030f3a637!2s5610%20185th%20St%2C%20Flushing%2C%20NY%2011365%2C%20USA!5e0!3m2!1sde!2sde!4v1717242682956!5m2!1sde!2sde"',
          }
      },
    ]
}
export default content;
