import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
  'id'      : 'design-preview',
  'state'   : 'publish',
  'language': 'en',
  'modules' : [
    {
      'uuid'   : '5ce74ed6-d038-4a64-a553-9d22959a79ec',
      'type'   : 'emotion-module',
      'variant': [
        'height50',
        'centerContent',
        'bright'
      ],
      'background': {
        'src': 'https://cdn3.lilaquadrat.de/lilaquadrat/homepage/1pexels-scott-webb-2346594.jpg'
      },
      'textblock': {
        'headline': 'lilaquadrat STUDIO Design',
        'subline' : 'empowering creators and designers'
      }
    },
    {
      'uuid'    : '1a0063d1-aa5a-4ecd-8a8e-70d24af58146',
      'type'    : 'text-module',
      'headline': 'Explore the modules',
      'variant': []
    },
    {
      'uuid'    : 'eab093a0-8a89-44c4-a7fb-8a741077c6a0',
      'type'    : 'text-module',
      'id'      : 'modules & partials',
      'headline': 'Modules and Partials as Basis for creativity.',
      'text'    : [
        'By breaking down complex projects into manageable, interchangeable parts, designers and developers can experiment with endless configurations, fostering innovation and personalized solutions'
      ],
      'variant': []
    },
    {
      'uuid'    : '1d9c144f-e186-461e-a167-ae20e7236fb3',
      'type'    : 'text-module',
      'id'      : 'purpose',
      'headline': 'accelerate and empower',
      'text'    : [
        'Designed specifically to streamline the design process and enhance the capabilities of content creators.'
      ],
      'variant': []
    },
    {
      'uuid'    : '8a48fdee-6f7e-4c78-8455-6c313796ce33',
      'type'    : 'text-module',
      'id'      : 'Editor',
      'headline': 'The Power of lilaquadrat STUDIO at hand.',
      'text'    : [
        'Designed for lilaquadrat STUDIO and ready for use.'
      ],
      'variant': []
    }
  ],
  'settings': {
    'mode': 'presentation'
  },
  'target' : 'browser',
  'company': 'lilaquadrat',
  'project': 'homepage',
}

export default content;