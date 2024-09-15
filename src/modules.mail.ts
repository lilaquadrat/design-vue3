import CallToActionModuleMail from '@/components/modules/callToAction.module.mail.vue';
import PictureModuleMail from './components/modules/picture.module.mail.vue';
import TextModuleMail from './components/modules/text.module.mail.vue';
import ContentModuleMail from '@/components/modules/content.module.mail.vue';

export default 
{
  revision: 2,
  modules : [
    {
      name    : 'text',
      variants: [
        {
          key : 'center',
          name: 'Text zentriert',
        }
      ],
      component: TextModuleMail
    },
    {
      name     : 'picture',
      variants : [],
      component: PictureModuleMail
    },
    {
      name     : 'callToAction',
      variants : [],
      component: CallToActionModuleMail
    },
    {
      name             : 'content',
      variants         : [],
      availableInEditor: false,
      component        : ContentModuleMail
    },
  ]
}
  