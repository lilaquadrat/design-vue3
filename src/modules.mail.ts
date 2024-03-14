export default 
{
  revision: 2,
  modules : [
    {
      name     : 'text',
      variants : [],
      component: () => import('@/components/modules/text.module.mail.vue'),
    },
    {
      name     : 'picture',
      variants : [],
      component: () => import('@/components/modules/picture.module.mail.vue'),
    },
    {
      name             : 'content',
      variants         : [],
      availableInEditor: false,
      component        : () => import('@/components/modules/content.module.mail.vue'),
    },
  ]
}
  