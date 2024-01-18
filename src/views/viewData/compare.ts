export default {
  id      : 'home',
  company : 'company',
  project : 'project',
  settings: {
    mode: 'presentation'
  },
  state  : 'publish',
  modules: [
    {
      'type'     : 'compare-module',
      'variant'  : ['variantA', 'variantB'],
      'changed'  : true,
      'textblock': {
        'headline': 'Comparative Analysis of Product Features',
        'subline' : 'A Detailed Look at What Sets Our Products Apart'
      },
      'elements': [
        {
          'headline'   : 'Product A Features',
          'description': 'Key features and benefits of Product A',
          'elements'   : [
            [
              'Advanced Technology',
              'Eco-friendly',
              'User-friendly Interface'
            ]
          ]
        },
        {
          'headline'   : 'Product B Features',
          'description': 'Distinctive features of Product B',
          'elements'   : [
            [
              'no',
              'Energy Efficient',
              'High Durability'
            ]
          ]
        },
        {
          'headline'   : 'Product C Features',
          'description': 'Unique selling points of Product C',
          'elements'   : [
            [
              'Innovative Functionality',
              'yes',
              'Easy Maintenance'
            ]
          ]
        }
      ],
      'structure': [
        {
          'headline'   : 'Market Comparison',
          'description': 'Analyzing market competitors',
          'list'       : [
            'Competitor Analysis',
            'Market Trends',
            'Consumer Preferences'
          ]
        },
        {
          'headline'   : 'Customer Feedback',
          'description': 'Summary of customer reviews and feedback',
          'list'       : [
            'User Satisfaction',
            'Product Reliability',
            'After-sales Service'
          ]
        }
      ]
    }
    
  ],
};