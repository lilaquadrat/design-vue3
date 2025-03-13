export default {
  '400': {
    modules: [
      {
        type    : 'text-module',
        variant : ['center'],
        headline: 'Something went wrong',
        links   : {
          'value': [
            {
              'text'   : 'back to home',
              'link'   : '/',
              'variant': [
                'callToAction'
              ],
            }
          ]
        }
      }
    ]
  },
  '401': {
    modules: [
      {
        type    : 'text-module',
        variant : ['center'],
        headline: 'Login required',
        links   : {
          'value': [
            {
              'text'   : 'login',
              'event'  : 'login',
              'variant': [
                'callToAction'
              ],
            },
            {
              'text'   : 'register',
              'event'  : 'register',
              'variant': [
                'callToAction'
              ],
            }
          ]
        }
      }
    ]
  },
  '403': {
    modules: [
      {
        type    : 'text-module',
        variant : ['center'],
        headline: 'Du wirst weitergeleitet',
        links   : {
          'value': [
            {
              'text'   : 'back to home',
              'link'   : '/',
              'variant': [
                'callToAction'
              ],
            },
          ]
        }
      }
    ]
  },
  'email-verification': {
    modules: [
      {
        type    : 'text-module',
        variant : ['center'],
        headline: 'you have to verify your email address to use this application',
        links   : {
          'value': [
            {
              'text'   : 'back to home',
              'link'   : '/',
              'variant': [
                'callToAction'
              ],
            },
          ]
        }
      }
    ]
  },
  'user-connect': {
    modules: [
      {
        type    : 'text-module',
        variant : ['center'],
        headline: 'you have to verify your email address to use this application',
        links   : {
          'value': [
            {
              'text'   : 'back to home',
              'link'   : '/',
              'variant': [
                'callToAction'
              ],
            },
          ]
        }
      }
    ]
  },
  'redirect': {
    modules: [
      {
        type    : 'text-module',
        variant : ['center'],
        headline: 'you will be redirected',
      }
    ]
  }
}