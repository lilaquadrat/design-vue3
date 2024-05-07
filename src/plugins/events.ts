import type GenericEvents from '@/interfaces/GenericEvents.interface';
import { auth } from './auth';
import useUserStore from '@/stores/user.store';

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
  refresh_token: () => {

    auth.triggerLogin()

  }
}

/**
 * triggers a predefined event
 */
function triggerEvent (type: keyof typeof events | string, params?: Record<string, unknown>) {

  const event = events[type as keyof typeof events];

  if(!event) {

    console.error('EVENT_MISSING', event);
    throw new Error('EVENT_MISSING');

  }

  return event(params);

} 

export default triggerEvent;