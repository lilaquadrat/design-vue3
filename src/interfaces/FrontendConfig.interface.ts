import type { Auth0ClientOptions } from '@auth0/auth0-spa-js';

export default interface FrontendConfig {

    auth0Options: Auth0ClientOptions

    /**
     * for identification at the backend
     */
    name: string

}