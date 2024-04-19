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
      component: () => import('@/components/modules/text.module.mail.vue'),
    },
    {
      name     : 'picture',
      variants : [],
      component: () => import('@/components/modules/picture.module.mail.vue'),
    },
    {
      name     : 'callToAction',
      variants : [],
      component: () => import('@/components/modules/callToAction.module.mail.vue'),
    },
    {
      name             : 'content',
      variants         : [],
      availableInEditor: false,
      component        : () => import('@/components/modules/content.module.mail.vue'),
    },
  ]
}
  