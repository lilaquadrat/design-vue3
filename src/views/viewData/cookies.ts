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
            type     : 'cookies-module',
            textblock: {
              intro: 'cookies',
              text : [
                'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
              ],
            },
            variant: ['overlay', 'overlayRight'],
          },
          {
            type     : 'cookies-module',
            textblock: {
              intro: 'Some cookies for you.',
              text : [
                'Egal, was auf der To-Do-Liste steht: Auf den Support ist Verlass. Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
                'Ein persönlicher Ansprechpartner agiert bei jeder Anfrage nach definierten Regeln, hält sich an Absprachen und kümmert sich innerhalb fixierter Zeiten um eine Lösung.',
              ],
            },
            variant: [],
          },
    ],
  };