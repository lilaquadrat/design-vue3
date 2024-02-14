import logger from '@/mixins/logger';
import { Auth0Client, type Auth0ClientOptions } from '@auth0/auth0-spa-js';
import { ref, type App } from 'vue';

class Auth {

  auth0!: Auth0Client;

  options: {dev: boolean} = {dev: false};

  isAuth = ref<boolean>(false);

  token = ref<string>();

  async init (auth0: Auth0ClientOptions, options?: {dev: boolean}) {

    logger.auth('init')
    this.auth0 = new Auth0Client(auth0);
    
    if(options) this.options = options;
    
    try {
      
      await this.updateAuthStatus();
      
    } catch (error) {
      
      console.error(error);
      
    }
    
    if(this.isAuth.value && !this.token.value) await this.getToken();

    console.log(this.isAuth.value, this.token.value);

    logger.auth('init done')
  }

  async updateAuthStatus () {

    this.isAuth.value = await this.auth0.isAuthenticated();

  }

  async getToken () {

    console.log('get token');
    
    this.token.value = await this.auth0.getTokenSilently({authorizationParams: {scope: 'openid profile email offline_access', audience: 'https://testapi.lilaquadrat.de'}});

  }

  getTokenContent () {

    return this.auth0.getIdTokenClaims();

  }

  triggerLogin (customerId?: string) {

    this.auth0.loginWithRedirect({appState: {customerId}});

  }

  async handleCallback () {

    const result = await this.auth0.handleRedirectCallback();

    console.log(result);
    await this.updateAuthStatus();
    await this.getToken();

  }

}

const auth = new Auth;
const plugin = {
  install: (vue: App): void => {

    logger.plugins('auth installed')
  },
};
const useAuth = () => ({authToken: auth.token.value})
  
export default plugin;
export {
  auth,
  useAuth
}