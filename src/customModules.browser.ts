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
    description: 'Gibt dem Nutzer die Möglichkeit seine E-Mail Adresse zu verifizieren'
  },
  {
    hint          : 'confirm-email-1',
    module        : 'confirm-email-module',
    name          : 'mit daten',
    description   : 'Gibt dem Nutzer die Möglichkeit seine E-Mail Adresse zu verifizieren',
    additionalData: {
      name       : 'some data',
      description: 'some description for some data'
    }
  },
]

export default customModules;