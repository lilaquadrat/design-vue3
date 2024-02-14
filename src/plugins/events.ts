import { auth } from './auth';

const events = {
  login: (params?: Record<string, unknown>) => {

    auth.triggerLogin('testid');

  },
  logout: (params?: Record<string, unknown>) => {

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