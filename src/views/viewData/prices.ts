export default {
  'id'      : 'home',
  'company' : 'company',
  'project' : 'project',
  'settings': {
    'mode': 'presentation'
  },
  'state'  : 'publish',
  'modules': [
    {
      'type'     : 'prices-module',
      'variant'  : [],
      'changed'  : true,
      'textblock': {
        'headline': 'Comparative Analysis of Product Features',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      'elements': [
        {
          'textblock': {
            'headline': 'Price 1',
            'intro'   : 'Basic Plan',
            'text'    : ['A Detailed Look at What Sets Our Products Apart']
          },
          'price'   : '199€',
          'interval': 'month',
          'facts'   : [
            'Basic support',
            'Access to core features',
            'Up to 5 users'
          ],
          'callToAction': {
            'link': '/buy-basic',
            'text': 'buy now'
          },
          'more': {
            'link': '/more-basic',
            'text': 'learn more'
          }
        },
        {
          'textblock': {
            'headline': 'Price 2',
            'intro'   : 'Professional Plan'
          },
          'price'   : '399€',
          'interval': 'month',
          'facts'   : [
            '24/7 support',
            'Advanced features',
            'Unlimited users',
            'Analytics tools'
          ],
          'callToAction': {
            'link': '/buy-pro',
            'text': 'buy now'
          },
          'more': {
            'link': '/more-pro',
            'text': 'learn more'
          }
        },
        {
          'textblock': {
            'headline': 'Price 3',
            'intro'   : 'Enterprise Plan'
          },
          'price'   : '899€',
          'interval': 'month',
          'facts'   : [
            'Dedicated support team',
            'All features included',
            'Custom integrations',
            'Priority service',
            'Advanced security'
          ],
          'callToAction': {
            'link': '/buy-enterprise',
            'text': 'buy now'
          },
          'more': {
            'link': '/more-enterprise',
            'text': 'learn more'
          }
        }
      ]
    },
    {
      'type'     : 'prices-module',
      'variant'  : [],
      'changed'  : true,
      'textblock': {
        'headline': 'Comparative Analysis of Product Features',
        'subline' : 'A Detailed Look at What Sets Our Products Apart'
      },
      'elements': [
        {
          'textblock': {
            'headline': 'Price 1',
            'intro'   : 'Basic Plan'
          },
          'price'   : '199€',
          'interval': 'month',
          'facts'   : [
            'Basic support',
            'Access to core features',
            'Up to 5 users'
          ],
          'callToAction': {
            'link': '/buy-basic',
            'text': 'buy now'
          },
          'more': {
            'link': '/more-basic',
            'text': 'learn more'
          },
        },
        {
          'textblock': {
            'headline': 'Price 2',
            'intro'   : 'Professional Plan'
          },
          'price'   : '399€',
          'interval': 'month',
          'facts'   : [
            '24/7 support',
            'Advanced features',
            'Unlimited users',
            'Analytics tools'
          ],
          'callToAction': {
            'link': '/buy-pro',
            'text': 'buy now'
          },
          'more': {
            'link': '/more-pro',
            'text': 'learn more'
          },
          variant: ['highlight']
        },
        {
          'textblock': {
            'headline': 'Price 3',
            'intro'   : 'Enterprise Plan'
          },
          'price'   : '899€',
          'interval': 'month',
          'facts'   : [
            'Dedicated support team',
            'All features included',
            'Custom integrations',
            'Priority service',
            'Advanced security'
          ],
          'callToAction': {
            'link': '/buy-enterprise',
            'text': 'buy now'
          },
          'more': {
            'link': '/more-enterprise',
            'text': 'learn more'
          }
        }
      ]
    }
  ]
}
