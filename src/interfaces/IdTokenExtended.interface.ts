import type { IdToken } from '@auth0/auth0-spa-js';

export default interface IdTokenExtended extends IdToken {
    lilaquadrat_configuration?: boolean
    lilaquadrat_firstLogin?: boolean
}

