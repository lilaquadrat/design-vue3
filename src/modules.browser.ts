import ConnectUserModule from '@/components/modules/connect-user.module.vue';
import ContentModule from './components/modules/content.module.vue';
import PartialsPreviewModule from './components/modules/partials-preview.module.vue';
import ConfirmEmailModule from '@/components/modules/confirm-email.module.vue';
import BlogIntroModule from './components/modules/blog-intro.module.vue';
import CompareModule from '@/components/modules/compare.module.vue';
import ContactModule from '@/components/modules/contact.module.vue';
import CookiesModule from '@/components/modules/cookies.module.vue';
import EmotionModule from './components/modules/emotion.module.vue';
import FactsModule from './components/modules/facts.module.vue';
import FaqModule from '@/components/modules/faq.module.vue';
import FooterModule from '@/components/modules/footer.module.vue';
import GalleryModule from './components/modules/gallery.module.vue';
import IndexModule from './components/modules/index.module.vue';
import MenuModule from './components/modules/menu.module.vue';
import NavigationModule from '@/components/modules/navigation.module.vue';
import PartialModule from '@/components/modules/partial.module.vue';
import PictureModule from '@/components/modules/picture.module.vue';
import PictureandtextModule from '@/components/modules/pictureandtext.module.vue';
import PicturegroupModule from '@/components/modules/picturegroup.module.vue';
import PricesModule from '@/components/modules/prices.module.vue';
import PlaceholderModule from '@/components/modules/placeholder.module.vue';
import QuoteModule from '@/components/modules/quote.module.vue';
import TextModule from '@/components/modules/text.module.vue';
import TrainingModule from '@/components/modules/training.module.vue';
import VideoModule from '@/components/modules/video.module.vue';
import TimelineModule from '@/components/modules/timeline.module.vue';
import EventsListModule from '@/components/modules/events-list.module.vue';
import EventModule from '@/components/modules/event.module.vue';
import StoryModule from '@/components/modules/story.module.vue';
import LocationModule from '@/components/modules/location.module.vue';
import QuellcodeModule from './components/modules/quellcode.module.vue';

export default
{
  revision: 2,
  modules : [
    {
      name             : 'partials-preview',
      variants         : [],
      availableInEditor: false,
      component        : PartialsPreviewModule
    },
    {
      name             : 'content',
      variants         : [],
      availableInEditor: false,
      component        : ContentModule
    },
    {
      name             : 'connect-user',
      variants         : [],
      availableInEditor: false,
      component        : ConnectUserModule
    },
    {
      name             : 'confirm-email',
      variants         : [],
      availableInEditor: false,
      component        : ConfirmEmailModule
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
      component: BlogIntroModule
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
      component: CompareModule
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
      component: ContactModule
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

      component: CookiesModule
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
        {
          key        : 'align',
          name       : 'Modul ausrichten',
          description: 'Wenn das Module im Fokus steht und nicht richtig ausgerichtet ist, wird aktuelle Position automatisch angepasst.',
          group      : 'behaviour',
        },
      ],
      component: EmotionModule
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
      component: FactsModule
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

      component: FaqModule
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
      component: FooterModule
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

      component: GalleryModule
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
      component: IndexModule
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
      component: MenuModule
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
      component: NavigationModule
    },
    {
      name     : 'partial',
      variants : [],
      component: PartialModule
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
      component: PictureModule
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
      component: PictureandtextModule
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
      component: PicturegroupModule
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
      component: PricesModule
    },
    {
      name     : 'placeholder',
      variants : [],
      component: PlaceholderModule
    },
    {
      name    : 'quellcode',
      variants: [
        {
          key        : 'darkmode',
          name       : 'Dunkle Darstellung',
          description: 'Darstellung von Code',
        }
      ],
      component: QuellcodeModule
    },
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
      component: QuoteModule
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
      component: TextModule
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
      component: TrainingModule
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
      component: VideoModule
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
      component: TimelineModule
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
      component: EventsListModule
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
      component: EventModule
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
      component: StoryModule
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
      component: LocationModule
    },
  ]
}
