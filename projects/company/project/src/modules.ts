export default 
{
  revision: 2,
  modules : [
    {
      name    : 'text',
      variants: [ 
        {
          key : 'center',
          name: 'Text zentriert',
        },
        {
          key : 'notice',
          name: 'Module ist mit der Hauptfarbe hinterlegt',
        },
      ],
      component: () => import('@/components/modules/text.module.vue'),
    },
    {
      name     : 'content',
      variants : [],
      component: () => import('@/components/modules/content.module.vue'),
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
      name     : 'contact',
      variants : [],
      component: () => import('@/components/modules/contact.module.vue'),
    },
    {
      name     : 'cookies',
      variants : [],
      component: () => import('@/components/modules/cookies.module.vue'),
    },
    {
      name     : 'emotion',
      variants : [],
      component: () => import('@/components/modules/emotion.module.vue'),
    },
    {
      name     : 'facts',
      variants : [],
      component: () => import('@/components/modules/facts.module.vue'),
    },
    {
      name     : 'faq',
      variants : [],
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
      name     : 'index',
      variants : [],
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
      name     : 'pictureandtext',
      variants : [],
      component: () => import('@/components/modules/pictureandtext.module.vue'),
    },
    {
      name     : 'picturegroup',
      variants : [],
      component: () => import('@/components/modules/picturegroup.module.vue'),
    },
    {
      name     : 'prices',
      variants : [],
      component: () => import('@/components/modules/prices.module.vue'),
    },
    {
      name     : 'quellcode',
      variants : [],
      component: () => import('@/components/modules/quellcode.module.vue'),
    },
    {
      name     : 'quote',
      variants : [],
      component: () => import('@/components/modules/quote.module.vue'),
    },
    {
      name     : 'training',
      variants : [],
      component: () => import('@/components/modules/training.module.vue'),
    },
    {
      name     : 'video',
      variants : [],
      component: () => import('@/components/modules/video.module.vue'),
    },
  ]
}
  