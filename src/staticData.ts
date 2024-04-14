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
              'text'      : 'login',
              'link'      : 'login',
              'attributes': [
                'event'
              ],
              'variant': [
                'callToAction'
              ],
            },
            {
              'text'      : 'register',
              'link'      : 'register',
              'attributes': [
                'events'
              ],
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
        headline: 'you dont have the rights to view this content',
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
        headline: 'you have to verify your email adress to use this application',
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
  }
}