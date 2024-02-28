import type FrontendConfig from '@/interfaces/FrontendConfig.interface';

const config: Record<'local' | 'next' | 'live', FrontendConfig> = {
  local: {
    name   : 'crewadmin-catest',
    company: 'crewadmin',
    project: 'catest',
    api    : {
      mode           : 'custom',
      customEndpoints: {
        api  : 'http://localhost:9090',
        media: 'http://localhost:9091',
      },
    },
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
  },
  next: {
    name   : 'crewadmin-catest',
    company: 'crewadmin',
    project: 'catest',
    api    : {
      mode: 'next',
    },
    auth0Options: {
      domain             : 'lilaquadrat-test-tennant.eu.auth0.com',
      clientId           : 'kEztwgahBVhKE95egUczBDBpo7DzhmCC',
      cacheLocation      : 'localstorage',
      useRefreshTokens   : true,
      authorizationParams: {
        redirect_uri: 'https://crewadmin-catest.sun2020.de/login-callback',
        audience    : 'https://testapi.lilaquadrat.de',
        scope       : 'openid profile email offline_access'
      }
    },
    base: 'https://cdn2.lilaquadrat.de/crewadmin/catest/editor'
  },
  live: {
    name   : 'crewadmin-catest',
    company: 'crewadmin',
    project: 'catest',
    api    : {
      mode: 'live',
    },
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
    },
    base: 'https://cdn3.lilaquadrat.de/crewadmin/catest/editor'
  }
}

export default config;