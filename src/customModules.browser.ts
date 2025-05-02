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
    hint       : 'order-success',
    module     : 'order-success-module',
    name       : 'Abgeschlossene Bestellung einsehen',
    description: 'Zeigt dem Nutzer eine abgeschlossene Bestellung an'
  },

]

export default customModules;