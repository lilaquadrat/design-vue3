import { auth } from './auth';
import useUserStore from '@/stores/user.store';

const events = {
  login: (params?: Record<string, unknown>) => {
    
    const userStore = useUserStore();

    auth.triggerLogin(userStore.customer?._id);
    
  },
  logout: (params?: Record<string, unknown>) => {
    
    const userStore = useUserStore();

    auth.triggerLogout();
    
  },
  register: (params?: Record<string, unknown>) => {
    
    const userStore = useUserStore();

    auth.triggerRegister(userStore.customer?._id);

  },
  refresh_token: (params?: Record<string, unknown>) => {

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