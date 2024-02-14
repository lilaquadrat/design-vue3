import type FrontendConfig from '@/interfaces/FrontendConfig.interface';

const config: FrontendConfig = {
  name        : 'company-project',
  auth0Options: {
    domain             : 'lilaquadrat-test-tennant.eu.auth0.com',
    clientId           : 'kEztwgahBVhKE95egUczBDBpo7DzhmCC',
    cacheLocation      : 'localstorage',
    useRefreshTokens   : true,
    authorizationParams: {
      redirect_uri: 'http://localhost:5173/login-callback',
      audience    : 'https://testapi.lilaquadrat.de',
      scope       : 'openid profile email offline_access'
    }
  }
}

export default config;