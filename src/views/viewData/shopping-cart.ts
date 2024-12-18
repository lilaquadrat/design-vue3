import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'Shopping Cart',
    description: 'Add and remove products from your shopping cart'
  },
  state  : 'publish',
  modules: [
    {
      type     : 'shopping-cart-module',
      variant  : [''],
    },
    {
      type    : 'text-module',
      variant : [],
      headline: 'some headline',
      subline : 'some subline',
      intro   : 'some intro',
      text    : [
        'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
        'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
      ],
      links: {
        value: [
          {text: 'Ticket', callToAction: true, event: 'addToCart', additionalData: '10516916404383'},
          {text: 'Ticket 1', callToAction: true, event: 'addToCart', additionalData: '10529913536671'},
          {text: 'Ticket 2', callToAction: true, event: 'addToCart', additionalData: '10529914323103'},
        ],
      },
    },
  ],
};

export default content;