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
      name    : 'blog-intro',
      variants: [
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
      component: () => import('@/components/modules/blog-intro.module.vue'),
    },
    {
      name    : 'compare',
      variants: [
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
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
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
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
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
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
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
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
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],

      component: () => import('@/components/modules/faq.module.vue'),
    },
    {
      name    : 'footer',
      variants: [
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
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
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
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
        },
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
      component: () => import('@/components/modules/index.module.vue'),
    },
    {
      name    : 'menu',
      variants: [
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
      component: () => import('@/components/modules/menu.module.vue'),
    },
    {
      name    : 'navigation',
      variants: [
        {
          key : 'left',
          name: 'left',
        },
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
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
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
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
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
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
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
      component: () => import('@/components/modules/picturegroup.module.vue'),
    },
    {
      name    : 'prices',
      variants: [
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
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
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
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
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
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
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
      component: () => import('@/components/modules/training.module.vue'),
    },
    {
      name    : 'video',
      variants: [
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
      component: () => import('@/components/modules/video.module.vue'),
    },
    {
      name    : 'timeline',
      variants: [
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
      component: () => import('@/components/modules/timeline.module.vue'),
    },
    {
      name    : 'events-list',
      variants: [
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
      component: () => import('@/components/modules/events-list.module.vue'),
    },
    {
      name    : 'event',
      variants: [
        {
          key        : 'noContent',
          name       : 'Listeninhalte verbergen',
          description: 'Falls eine Liste verbunden wurde, werden automatisch die passenden Inhalte, die in der Liste ausgewählt wurden, angezeigt. Diese Variante verhindert dieses Verhalten.'
        },
        {
          key        : 'onlyContent',
          name       : 'Nur Listeninhalte anzeigen',
          description: 'Es werden nur die Inhalte aus der verbundenen Listen angezeigt.'
        },
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
      component: () => import('@/components/modules/event.module.vue'),
    },
    {
      name    : 'story',
      variants: [
        {
          key        : 'align',
          name       : 'Automatisch zentrieren',
          description: 'Wenn das Module nicht vollständig zentriert ist, wird automatisch zum Startpunkt des Modules gescrolled',
        },
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
      additionalData: {
        animations: [
          {
            key : '',
            name: 'Keine Animation',
          },
          {
            key : 'leftToRight',
            name: 'links nach rechts',
          },
          {
            key : 'rightToLeft',
            name: 'rechts nach links',
          },
          {
            key : 'bottomToTop',
            name: 'unten nach oben',
          },
          {
            key : 'topToBottom',
            name: 'oben nach unten',
          },
          {
            key : 'scaleUp',
            name: 'vergrössern',
          },
          {
            key : 'scaleDown',
            name: 'verkleinern',
          },
        ],
        storyVariants: [
          {
            key : 'textVerticalCenter',
            name: 'Text vertikal zentriert',
          },
          {
            key : 'textVerticalEnd',
            name: 'Text unten positioniert',
          },
        ],
      },
      component: () => import('@/components/modules/story.module.vue'),
    },
    {
      name    : 'location',
      variants: [
        {
          key        : 'pdf-single-page',
          name       : 'Eigene Seite',
          description: 'Ist Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-after',
          name       : 'Neue Seite nach diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key        : 'pdf-new-page-before',
          name       : 'Neue Seite vor diesem Module',
          description: 'Innerhalb der PDF eine eigene Seite ohne andere Module',
          group      : 'pdf',
        },
        {
          key  : 'pdf-invisible',
          name : 'Wird nicht in PDF angezeigt',
          group: 'pdf',
        },
      ],
      component: () => import('@/components/modules/location.module.vue'),
    },
  ]
}
