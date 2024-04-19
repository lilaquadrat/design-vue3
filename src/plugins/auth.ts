import type AppState from '@/interfaces/AppState.interface';
import type IdTokenExtended from '@/interfaces/IdTokenExtended.interface';
import logger from '@/mixins/logger';
import { Auth0Client, type Auth0ClientOptions } from '@auth0/auth0-spa-js';
import { ref, type App } from 'vue';

class Auth {

  auth0!: Auth0Client;

  options: { dev: boolean } = { dev: false };

  isAuth = ref<boolean>(false);

  token = ref<string>();

  async init (auth0: Auth0ClientOptions, options?: { dev: boolean }) {

    logger.auth('init')
    this.auth0 = new Auth0Client(auth0);

    if (options) this.options = options;

    try {

      await this.updateAuthStatus();

    } catch (error) {

      console.error(error);

    }

    try {
      
      if (this.isAuth.value && !this.token.value) await this.getToken();

    } catch (error) {
      
      console.error(error);

    }

    logger.auth('init done')
  }

  async updateAuthStatus () {

    this.isAuth.value = await this.auth0.isAuthenticated();

  }

  async getToken () {

    this.token.value = await this.auth0.getTokenSilently({ authorizationParams: { scope: 'openid profile email offline_access', audience: 'https://testapi.lilaquadrat.de' } });

  }

  async refreshToken () {

    this.token.value = await this.auth0.getTokenSilently({ authorizationParams: { scope: 'openid profile email offline_access', audience: 'https://testapi.lilaquadrat.de' } });

  }

  getTokenContent (): Promise<IdTokenExtended | undefined> {

    return this.auth0.getIdTokenClaims() as Promise<IdTokenExtended | undefined>;

  }

  triggerLogin (customerId?: string, emailConfirmationCode?: string) {

    this.auth0.loginWithRedirect<AppState>({ appState: { customerId, emailConfirmationCode } });

  }

  triggerRegister (customerId?: string, emailConfirmationCode?: string) {

    this.auth0.loginWithRedirect<AppState>({ appState: { customerId, emailConfirmationCode }, authorizationParams: { screen_hint: 'signup' } });

  }

  triggerLogout () {

    this.auth0.logout();
    localStorage.removeItem('lila-customer');

  }

  async handleCallback () {

    const result = await this.auth0.handleRedirectCallback<AppState>();

    await this.updateAuthStatus();
    await this.getToken();

    return result;

  }

}

const auth = new Auth;
const plugin = {
  install: (vue: App): void => {

    logger.plugins('auth installed')
  },
};
const useAuth = () => ({ authToken: auth.token.value })

export default plugin;
export {
  auth,
  useAuth
}