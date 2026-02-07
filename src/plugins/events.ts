import type GenericEvents from '@/interfaces/GenericEvents.interface';
import type EventDeclaration from '@/interfaces/EventDeclaration.interface';
import { auth } from './auth';
import useUserStore from '@/stores/user.store';
import useCartStore from '@/stores/cart.store';
import { useTraceable } from './traceable';
import StudioSDK from '@lilaquadrat/sdk';
import useMainStore from '@/stores/main.store';
import logger from '@/mixins/logger';
import type { Ref } from 'vue';

const eventDeclarations: EventDeclaration[] = [
  {
    id         : 'login',
    name       : 'Anmelden',
    description: 'löst den Login für Benutzer aus',
  },
  {
    id         : 'logout',
    name       : 'Abmelden',
    description: 'löst den Logout für Benutzer aus',
  },
  {
    id         : 'register',
    name       : 'Registrieren',
    description: 'erstellt ein neues Benutzerkonto',
  },
  {
    id             : 'resendConfirmationMail',
    name           : 'Bestätigungscode erneut senden',
    description    : 'Eingeloggte Nutzer',
    confirmRequired: true,
    operation      : true,
    feedback       : {
      resolved: 'Bestätigungscode wurde versendet',
      rejected: 'Bestätigungscode konnte nicht gesendet werden',
      pending : 'Bestätigungscode wird versendet'
    }
  },
  {
    id         : 'refresh_token',
    name       : 'Anmeldung aktualisieren',
    description: 'aktualisiert das Authentifizierungstoken für den Benutzer',
  },
  {
    id            : 'addToCart',
    name          : 'In den Warenkorb legen',
    description   : 'fügt das angegebene Produkt dem Warenkorb hinzu',
    additionalData: {
      name       : 'shopifyid',
      description: 'die Produkt-ID'
    }
  },
  {
    id         : 'scrollToNextModule',
    name       : 'Scroll zum nächstes Module',
    description: 'Scrollt zum nächsten Module',
  }
];
const events: GenericEvents = {
  login: () => {
    
    const userStore = useUserStore();

    auth.triggerLogin(userStore.customer?._id, userStore.emailConfirmationCode);
    
  },
  logout: () => {
    
    auth.triggerLogout();
    
  },
  register: () => {
    
    const userStore = useUserStore();

    auth.triggerRegister(userStore.customer?._id, userStore.emailConfirmationCode);

  },
  addToCart: (product?: string) => {

    console.log('add to cart', product);

    if(!product) {
      console.warn('ADD_TO_CART_FAILED_PRODUCT_ID_MISSING');
      return;
    }

    const cartStore = useCartStore();

    cartStore.addProduct(product as string);

  },
  refresh_token: () => {

    auth.triggerLogin()

  },
  scrollToNextModule: (additionalData: string | undefined, mouseEvent: MouseEvent) => {

    const target = mouseEvent.target as HTMLElement;
    const parentModule = target?.closest('.lila-module');
    const nextSibling = parentModule?.nextElementSibling;

    console.log('scroll to next module');

    if(nextSibling) {

      nextSibling.scrollIntoView({
        behavior: 'smooth',
        block   : 'center'
      });

    }

  },
  resendConfirmationMail: async (additionalData: string | undefined, mouseEvent: MouseEvent, traceId: Ref<string|undefined>) => {

    const { apiConfig } = useMainStore();
    const { traceable } = useTraceable();
    const sdk = new StudioSDK(apiConfig)

    await traceable(sdk.members.me.confirmEmail('ssad'), traceId);

  }
}

/**
 * triggers a predefined event
 */
function triggerEvent (type: keyof typeof events | string, additionalData: string | undefined, mouseEvent: MouseEvent, traceId: Ref<string|undefined>) {

  const event = events[type as keyof typeof events];

  if(!event) {

    console.error('EVENT_MISSING', type, event);
    throw new Error('EVENT_MISSING');

  }

  return event(additionalData, mouseEvent, traceId);

} 

const useEvents = () => ({triggerEvent, eventDeclarations, events})
const plugin = {
  install: () => {
    logger.plugins('events installed');
  },
};

export default plugin;
export {
  useEvents
}