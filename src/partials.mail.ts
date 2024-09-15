import ListPartialMail from '@/components/partials/list.partial.mail.vue';
import LinkPartialMail from './components/partials/link.partial.mail.vue';
import PicturePartialMail from '@/components/partials/picture.partial.mail.vue';
import TextblockPartialMail from '@/components/partials/textblock.partial.mail.vue';

export default [
  {
    name     : 'link',
    component: LinkPartialMail
  },
  {
    name     : 'list',
    component: ListPartialMail
  },
  {
    name     : 'picture',
    component: PicturePartialMail
  },
  {
    name     : 'textblock',
    component: TextblockPartialMail
  },
  {
    name     : 'picture',
    component: PicturePartialMail
  },
]
