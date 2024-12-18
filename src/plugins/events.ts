import type GenericEvents from '@/interfaces/GenericEvents.interface';
import { auth } from './auth';
import useUserStore from '@/stores/user.store';
import useCartStore from '@/stores/cart.store';

const eventDeclaration = [
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

  }
}

/**
 * triggers a predefined event
 */
function triggerEvent (type: keyof typeof events | string, additionalData: string | undefined, mouseEvent: MouseEvent) {

  const event = events[type as keyof typeof events];

  if(!event) {

    console.error('EVENT_MISSING', type, event);
    throw new Error('EVENT_MISSING');

  }

  return event(additionalData, mouseEvent);

} 

export default triggerEvent;
export {
  eventDeclaration,
  events,
}