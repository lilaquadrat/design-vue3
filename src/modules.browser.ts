export default
{
  revision: 2,
  modules : [
    {
      name             : 'content',
      variants         : [],
      availableInEditor: false,
      component        : () => import('@/components/modules/content.module.vue'),
    },
    {
      name             : 'connect-user',
      variants         : [],
      availableInEditor: false,
      component        : () => import('@/components/modules/connect-user.module.vue'),
    },
    {
      name             : 'confirm-email',
      variants         : [],
      availableInEditor: false,
      component        : () => import('@/components/modules/confirm-email.module.vue'),
    },
    {
      name     : 'blog-intro',
      variants : [],
      component: () => import('@/components/modules/blog-intro.module.vue'),
    },
    {
      name     : 'compare',
      variants : [],
      component: () => import('@/components/modules/compare.module.vue'),
    },
    {
      name    : 'contact',
      variants: [],
      target  : ['browser'],
      editor  : {
        modes: [
          {
            key : 'feedback',
            name: 'Zeigt die Ergebnissseite anstatt das Formular',
          },
        ],
      },
      component: () => import('@/components/modules/contact.module.vue'),
    },
    {
      name    : 'cookies',
      variants: [
        {
          key : 'overlay',
          name: 'Wird als Dialog Overlay angezeigt.',
        },
        {
          key : 'overlayRight',
          name: 'Overlay wird rechts unten angezeigt',
        },
      ],

      component: () => import('@/components/modules/cookies.module.vue'),
    },
    {
      name    : 'emotion',
      variants: [
        {
          key : 'centerContent',
          name: 'Inhalte vertikal und horizontal zentriert',
        },
        {
          key : 'bright',
          name: 'Heller Text',
        },
        {
          key : 'dark',
          name: 'Dunkler Text',
        },
        {
          key        : 'picture-switch',
          name       : 'Text und Bild tauschen',
          description: 'Wenn ein Bild hinterlegt ist, wird der Text im Vordergrund angezeigt',
        },
        {
          key        : 'height50',
          name       : 'Modul 50%',
          description: 'Modulhöhe 50%',
        },
        {
          key        : 'height80',
          name       : 'Modul 80%',
          description: 'Modulhöhe 80%',
        },
        {
          key        : 'content-inline',
          name       : 'Modulgröße an Text angepasst',
          description: 'Modulhöhe ist abhängig von den Inhalten',
        },
      ],
      component: () => import('@/components/modules/emotion.module.vue'),
    },
    {
      name    : 'facts',
      variants: [
        {
          key        : 'topics',
          name       : 'Themenauswahl',
          description: 'Es kann zwischen einzelnen Themen gewählt werden'
        },
        {
          key        : 'threeRow',
          name       : 'Drei Spalten',
          description: 'Es werden drei Fakten pro Zeile angezeigt'
        },
        {
          key        : 'fit',
          name       : 'Bildergrößen werden vereinheitlicht',
          description: 'verschieden grosse Bilder werden in eine einheitliche Grosse umgewandelt',
        },
      ],
      component: () => import('@/components/modules/facts.module.vue'),
    },
    {
      name    : 'faq',
      variants: [
        {
          key        : 'medium',
          name       : 'Größe: Medium',
          description: 'Die maximale Breite des Modules wird erhöht',
        },
      ],

      component: () => import('@/components/modules/faq.module.vue'),
    },
    {
      name     : 'footer',
      variants : [],
      component: () => import('@/components/modules/footer.module.vue'),
    },
    {
      name    : 'gallery',
      variants: [
        {
          key        : 'variant2',
          name       : 'alternatives Design',
          description: 'alternatives Design, andere Bilderanzeige',
        },
        {
          key        : 'fullscreen',
          name       : 'Vollbildmodus',
          description: 'Das Bild wird an die gesamte Bildschirmgröße angepasst.',
        },
        {
          key        : 'disableOverlay',
          name       : 'Overlay ausschalten',
          description: 'Deaktiviert die Möglichkeit, die Galerie im Overlay anzuzeigen.',
        },
        {
          key        : 'simpleIndicator',
          name       : 'Einfacher Indikator',
          description: 'Zeigt einen einfachen Indikator an.',
        },
        {
          key        : 'disableControls',
          name       : 'Steuerelemente deaktivieren',
          description: 'Deaktiviert die Steuerelemente.',
        },
      ],

      component: () => import('@/components/modules/gallery.module.vue'),
    },
    {
      name    : 'index',
      variants: [
        {
          key        : 'medium',
          name       : 'Größe: Medium',
          description: 'Die maximale Breite des Modules wird erhöht',
        },
        {
          key        : 'numbered',
          name       : 'Numberische Indikatoren',
          description: 'Es werden fortlaufendes Zahlen anstatt Icons angezeigt',
        },
        {
          key        : 'backgroundColor1',
          name       : 'Hauptfarbe als Hintergrund',
          description: 'Farbe des hintergrunds ist in gewählter Farbe1'
        },
        {
          key        : 'backgroundColor3',
          name       : 'Sekunddarfarbe als Hintergrund',
          description: 'Farbe des hintergrunds ist in gewählter Farbe3'
        },
        {
          key        : 'backgroundGrey',
          name       : 'Grauer Hintergrund',
          description: 'Farbe des hintergrunds ist in grau'
        }
      ],
      component: () => import('@/components/modules/index.module.vue'),
    },
    {
      name     : 'menu',
      variants : [],
      component: () => import('@/components/modules/menu.module.vue'),
    },
    {
      name    : 'navigation',
      variants: [
        {
          key : 'left',
          name: 'left',
        },
      ],
      component: () => import('@/components/modules/navigation.module.vue'),
    },
    {
      name     : 'partial',
      variants : [],
      component: () => import('@/components/modules/partial.module.vue'),
    },
    {
      name    : 'picture',
      variants: [
        {
          key : 'middle',
          name: 'Module wird in mittlerer Grösse dargestellt',
        },
        {
          key : 'small',
          name: 'Module wird kleiner dargestellt',
        },
        {
          key        : 'textOverlay',
          name       : 'Text im Bild rechts',
          description: 'Der Text wird statt unter dem Bild rechts im Bild angezeigt',
        },
        {
          key        : 'textPictureVertical',
          name       : 'Text bevor Bild',
          description: 'Der Text wird zentriert vor dem Bild angezeigt',
        },
        {
          key        : 'pictureTextVertical',
          name       : 'Bild bevor Text',
          description: 'Der Text wird zentriert nach dem Bild angezeigt',
        },
        {
          key        : 'fullscreen',
          name       : 'fullscreen',
          description: 'Das Bild wird so breit wie der aktuelle Container es zulässt.',
        },
        {
          key        : 'fullscreenOverlayEnabled',
          name       : 'Bild in Fullscreen als Overlay ermöglichen',
          description: 'Es wird ein Button angezeigt um das Bild in einem Overlay in Fullscreen anzuzeigen.',
        },
      ],
      component: () => import('@/components/modules/picture.module.vue'),
    },
    {
      name    : 'pictureandtext',
      variants: [
        {
          key        : 'fit',
          name       : 'Bild mit Links',
          description: 'das Bild wird links angezeigt und der Text rechts davon wird mittig angepasst',
        },
        {
          key        : 'switchContent',
          name       : 'Text fokussieren',
          description: 'Der Text wird auf Kosten des Bildes hervorgehoben',
        },
        {
          key        : 'focusImage',
          name       : 'Bild fokussieren',
          description: 'Das Bild wird hervorgehoben auf Kosten des Texts',
        },
      ],
      component: () => import('@/components/modules/pictureandtext.module.vue'),
    },
    {
      name    : 'picturegroup',
      variants: [
        {
          key        : 'fit',
          name       : 'Bildergrößen werden vereinheitlicht',
          description: 'verschieden grosse Bilder werden in eine einheitliche Grösse umgewandelt',
        },
        {
          key        : 'fourColumns',
          name       : 'Darstellung von 4 Bildern',
          description: '4 Bilder werden lose in einer Reihe angezeigt',
        },
        {
          key        : 'small',
          name       : 'Darstellung von 3 Bildern verkleinert',
          description: '3 verschieden grosse Bilder werden verkleinert unter dem Text nebeneinander gereiht ',
        },
        {
          key        : 'align',
          name       : 'Darstellung von 3 Bildern angepasst',
          description: '3 verschieden grosse Bilder werden genau auf die gleiche Breite des obigen Textes nebeneinander gereiht ',
        },
        {
          key        : 'color1',
          name       : 'Darstellung mit Hintergrundfarbe',
          description: '3 Bilder werden bekommen die Hauptfarbe als Hintergrund',
        },
        {
          key        : 'color3',
          name       : 'Darstellung mit Hintergrundfarbe',
          description: '3 Bilder werden bekommen die Sekundärfarbe als Hintergrund',
        },
        {
          key        : 'contact',
          name       : 'Kontaktdarstellung',
          description: 'Variante um Kontakte darzustellen',
        },
        {
          key : 'cards',
          name: 'cards',
        },
      ],
      component: () => import('@/components/modules/picturegroup.module.vue'),
    },
    {
      name     : 'prices',
      variants : [],
      component: () => import('@/components/modules/prices.module.vue'),
    },
    {
      name     : 'placeholder',
      variants : [],
      component: () => import('@/components/modules/placeholder.module.vue'),
    },
    // {
    //   name    : 'quellcode',
    //   variants: [
    //     {
    //       key        : 'darkmode',
    //       name       : 'Dunkle Darstellung',
    //       description: 'Darstellung von Code',
    //     }
    //   ],
    //   component: () => import('@/components/modules/quellcode.module.vue'),
    // },
    {
      name    : 'quote',
      variants: [
        {
          key        : 'small',
          name       : 'Kleine Darstellung',
          description: 'Darstellung von Zitaten',
        },
      ],
      component: () => import('@/components/modules/quote.module.vue'),
    },
    {
      name    : 'text',
      variants: [
        {
          key : 'center',
          name: 'Text zentriert',
        },
        {
          key : 'notice',
          name: 'Links werden zu Call To Action Buttons',
        },
      ],
      component: () => import('@/components/modules/text.module.vue'),
    },
    {
      name    : 'training',
      variants: [
        {
          key        : 'offsetTop',
          name       : 'Index Abstand nach oben',
          description: 'Index wird nach unten verschoben',
        },
      ],
      component: () => import('@/components/modules/training.module.vue'),
    },
    {
      name     : 'video',
      variants : [],
      component: () => import('@/components/modules/video.module.vue'),
    },
    {
      name     : 'timeline',
      variants : [],
      component: () => import('@/components/modules/timeline.module.vue'),
    },
    {
      name     : 'eventgroup',
      variants : [],
      component: () => import('@/components/modules/eventgroup.module.vue'),
    },
    {
      name     : 'singleevent',
      variants : [],
      component: () => import('@/components/modules/singleevent.module.vue'),
    },
    {
      name    : 'event',
      variants: [
        {
          key : 'center',
          name: 'Text zentriert',
        },
      ],
      component: () => import('@/components/modules/event.module.vue'),
    },
  ]
}
