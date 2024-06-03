import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
  'id'     : 'home',
  'company': 'company',
  'project': 'project',
  settings : {
    mode       : 'presentation',
    title      : 'Video',
    description: 'Single video, self hosted or youtube'
  },
  'state'  : 'publish',
  'modules': [
    {
      'type'     : 'video-module',
      'variant'  : [],
      'textblock': {
        'headline': 'Comparative Analysis of Product Features',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      'video': {
        'src'       : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/introfinal.mp4',
        'attributes': [],
        'preload'   : 'none'
      }
    },
    {
      'type'     : 'video-module',
      'variant'  : [],
      'textblock': {
        'headline': 'multi sources = Comparative Analysis of Product Features',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      'video': {
        'src'       : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/introfinal.mp4',
        'attributes': [],
        'source'    : [
          {
            media : 'tablet',
            source: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/geforce-now-start.webm'
          }
        ]
      }
    },
    {
      'type'     : 'video-module',
      'variant'  : ['bright'],
      'textblock': {
        'headline': 'Comparative Analysis of Product Features',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      'video': {
        'src'       : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/introfinal.mp4',
        'attributes': [],
        'preload'   : 'none'
      },
      'poster': {
        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_fiery_color_002-2.jpg'
      }
    },
    {
      'type'     : 'video-module',
      'variant'  : [],
      'textblock': {
        'headline': 'World of Warcraft',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      'poster': {
        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_fiery_color_002-2.jpg'
      },
      'video': {
        'src'       : 'https://www.youtube.com/watch?v=T0fTCDxudvE',
        'attributes': [],
        'preload'   : 'none'
      }
    },

    {
      'type'     : 'video-module',
      'variant'  : ['fullscreen'],
      'textblock': {
        'headline': 'World of Warcraft',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      'poster': {
        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_fiery_color_002-2.jpg'
      },
      // 'video': {
      //   'src'       : 'https://www.youtube.com/watch?v=T0fTCDxudvE',
      //   'attributes': []
      // }
    },
    {
      'type'     : 'video-module',
      'variant'  : [],
      'textblock': {
        'headline': 'World of Warcraft',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      'poster': {
        src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/untouched_fiery_color_002-2.jpg'
      },
      'video': {
        'src'       : 'https://www.youtube.com/watch?v=T0fTCDxudvE',
        'attributes': ['autoplay', 'mute']
      }
    },
    {
      'type'   : 'video-module',
      'variant': [],
      'video'  : {
        'src'       : 'https://www.youtube.com/watch?v=T0fTCDxudvE',
        'attributes': []
      }
    },
    {
      'type'     : 'video-module',
      'variant'  : [],
      'textblock': {
        'headline': 'with controls - Comparative Analysis of Product Features',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      'video': {
        'src'       : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/introfinal.mp4',
        'attributes': ['controls']
      }
    },
    {
      'type'     : 'video-module',
      'variant'  : ['small'],
      'textblock': {
        'headline': 'small - Comparative Analysis of Product Features',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      'video': {
        'src'       : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/introfinal.mp4',
        'attributes': []
      }
    },
    {
      'type'     : 'video-module',
      'variant'  : [],
      'textblock': {
        'headline': 'with controls - Comparative Analysis of Product Features',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      'video': {
        'src'       : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/introfinal.mp4',
        'attributes': ['autoplay', 'muted', 'loop']
      }
    },
    {
      'type'     : 'video-module',
      'variant'  : ['fullscreen', 'align'],
      'textblock': {
        'headline': 'with fullscreen & align - Comparative Analysis of Product Features',
        'subline' : 'A Detailed Look at What Sets Our Products Apart',
      },
      'video': {
        'src'       : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/introfinal.mp4',
        'attributes': []
      }
    },
  ]
}

export default content;
