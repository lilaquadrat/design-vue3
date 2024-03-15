import type { Auth0ClientOptions } from '@auth0/auth0-spa-js';
import type StudioSDK from '@lilaquadrat/sdk';

export default interface FrontendConfig {

    auth0Options: Auth0ClientOptions

    /**
     * for identification at the backend
     */
    name: string

    company: string
    project: string

    api: {
        mode: StudioSDK['mode']
        customEndpoints?: StudioSDK['customEndpoints']
    }

    /**
     * base path for loading files
     */
    base?: string

    /**
     * indicates that this project is dynamic. e.g. an app or an website with at least one dynamic part
     * 
     */
    dynamic?: boolean

}