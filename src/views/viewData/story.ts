import type { Content } from '@lilaquadrat/interfaces';

const content: Content = {
  id      : 'story',
  company : 'company',
  project : 'project',
  settings: {
    mode       : 'presentation',
    title      : 'Story',
    description: 'Animated stories'
  },
  state  : 'publish',
  modules: [
    {
      type    : 'story-module',
      variant : ['center'],
      timer: 10,
      elements: [
        {
          variant: ['textVerticalCenter'],
          media: {
            type     : 'image',
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/sailboat-ai.jpeg',
            animation: 'leftToRight',
            copyright: '© lilaquadrat',
          },
          textblock: {
            headline: 'Exploring New Horizons: Luxury Sailing Into the Future',
            subline: 'Aerial View Captures Majestic Sailing Vessel Cruising the Emerald Waters',
            text: ['In an awe-inspiring display of elegance and freedom, this aerial photograph captures a luxurious sailboat as it cuts through the vibrant turquoise seas. Designed for both performance and comfort, the vessel is a testament to modern maritime engineering, blending classic aesthetics with cutting-edge technology. As it navigates the vast, open waters, this sailboat not only showcases the thrilling possibilities of nautical adventures but also symbolizes a return to the timeless allure of sailing. The expansive seas around it highlight the pure joy and escapism that sailing offers to those seeking solace from the bustling world ashore.']
          },
          link  : {
            link: '/test',
            text: 'get to know'
          }
        },
        {
          variant: ['textVerticalEnd'],
          media: {
            type     : 'image',
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/beach2-ai.jpeg',
            animation: 'rightToLeft',
            copyright: '© lilaquadrat',
          },
          textblock: {
            subline: 'Vibrant Umbrellas Dot the Shoreline in a Seasonal Spectacle',
          }
        },
        {
          media: {
            type     : 'image',
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/beach-ai.jpeg',
            animation: 'topToBottom',
            copyright: '© lilaquadrat',
          },
          textblock: {
            headline: 'Sunset Splendor: Beachgoers Revel in Summer Bliss',
          }
        },
        {
          media: {
            type     : 'image',
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/woman1-ai.jpeg',
            animation: 'bottomToTop',
            copyright: '© lilaquadrat',
          },
          textblock: {
            headline: 'Sunset Splendor: Beachgoers Revel in Summer Bliss',
            subline: 'Vibrant Umbrellas Dot the Shoreline in a Seasonal Spectacle',
            text: ['Captured in the warm glow of the setting sun, this bustling beach scene epitomizes the quintessential summer getaway. With colorful umbrellas punctuating the sandy shores and a backdrop of lush greenery, the beach is a hive of activity. Families, friends, and solo adventurers gather here to soak up the sun and immerse themselves in the refreshing ocean waters, making lasting memories in this picturesque coastal retreat.']
          }
        },
        {
          media: {
            type     : 'image',
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/sailboat-ai.jpeg',
            animation: 'scaleUp',
            copyright: '© lilaquadrat',
          },
          textblock: {
            headline: 'Sunset Splendor: Beachgoers Revel in Summer Bliss',
            subline: 'Vibrant Umbrellas Dot the Shoreline in a Seasonal Spectacle',
            text: ['Captured in the warm glow of the setting sun, this bustling beach scene epitomizes the quintessential summer getaway. With colorful umbrellas punctuating the sandy shores and a backdrop of lush greenery, the beach is a hive of activity. Families, friends, and solo adventurers gather here to soak up the sun and immerse themselves in the refreshing ocean waters, making lasting memories in this picturesque coastal retreat.']
          }
        },
        {
          media: {
            type     : 'image',
            source   : [],
            alt      : 'IMAGE ALT',
            src      : 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/sailboat-ai.jpeg',
            animation: 'scaleDown',
            copyright: '© lilaquadrat',
          },
          textblock: {
            headline: 'Sunset Splendor: Beachgoers Revel in Summer Bliss',
            subline: 'Vibrant Umbrellas Dot the Shoreline in a Seasonal Spectacle',
            text: ['Captured in the warm glow of the setting sun, this bustling beach scene epitomizes the quintessential summer getaway. With colorful umbrellas punctuating the sandy shores and a backdrop of lush greenery, the beach is a hive of activity. Families, friends, and solo adventurers gather here to soak up the sun and immerse themselves in the refreshing ocean waters, making lasting memories in this picturesque coastal retreat.']
          }
        }
      ]
    }
  ]
};

export default content;