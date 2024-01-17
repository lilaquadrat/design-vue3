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
      type    : 'quote-module',
      quote   : 'thats some nice quote',
      citation: 'thats some nice quote',
      variant : [],
      link    : {
        link: '/test',
        text: 'some link'
      }
    },
    {
      type    : 'quote-module',
      quote   : 'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln.',
      citation: 'thats some nice quote',
      variant : ['quoteRight'],
      link    : {
        link: '/test',
        text: 'some link'
      }
    },
    {
      type    : 'quote-module',
      quote   : 'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln.',
      citation: 'thats some nice quote',
      variant : ['quoteCenter', 'authRight'],
      link    : {
        link: '/test',
        text: 'some link'
      }
    },
    {
      type    : 'quote-module',
      quote   : 'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln.',
      citation: 'thats some nice quote, small',
      variant : ['quoteCenter', 'authRight', 'small'],
      link    : {
        link: '/test',
        text: 'some link'
      }
    },
    {
      type    : 'quote-module',
      quote   : 'Yes',
      citation: 'thats some nice quote',
      variant : ['quoteCenter', 'captionCenter'],
      link    : {
        link: '/test',
        text: 'some link'
      }
    },
  ],
};