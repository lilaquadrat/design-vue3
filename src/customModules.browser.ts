import type { DesignCustomModule } from '@lilaquadrat/interfaces';

const customModules: DesignCustomModule[] = [
  {
    hint       : 'connect-user',
    module     : 'connect-user-module',
    name       : 'Benutzer verbinden',
    description: 'Verbindet den Nutzeraccount mit dem passenden Kunden'
  },
  {
    hint       : 'confirm-email',
    module     : 'confirm-email-module',
    name       : 'E-Mail Adresse verifizieren',
    description: 'Gibt dem Nutzer die Möglichkeit seine E-Mail Adresse zu verifizieren',
    values     : [
      {
        type       : 'string',
        id         : 'title2',
        label      : 'title2',
        description: 'give me some title2'
      },
    ]
  },
  {
    hint       : 'order-success',
    module     : 'order-success-module',
    name       : 'Abgeschlossene Bestellung einsehen',
    description: 'Zeigt dem Nutzer eine abgeschlossene Bestellung an',
    values     : [
      {
        type       : 'string',
        id         : 'title',
        label      : 'title',
        description: 'give me some title'
      },
      {
        type       : 'string',
        id         : 'title1',
        label      : 'title1',
        description: 'give me some title'
      },
      {
        type : 'number',
        id   : 'itemsToShow',
        label: 'How many item you want to display?',
      },
      {
        type : 'link',
        id   : 'link',
        label: 'link'
      },
      {
        type : 'media',
        id   : 'media',
        label: 'media'
      },
      {
        type : 'boolean',
        id   : 'checkbox',
        label: 'check this',
      },
      {
        type       : 'select',
        id         : 'select',
        label      : 'select',
        description: 'select something',
        options    : [{
          value      : 'value1',
          text       : 'text for value1',
          description: 'some description'
        }]
      }
    ]
  },

]

export default customModules;