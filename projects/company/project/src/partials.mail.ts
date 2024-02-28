export default [
  {
    name     : 'link',
    component: () => import('@/components/partials/link.partial.vue'),
  },
  {
    name     : 'list',
    component: () => import('@/components/partials/list.partial.vue'),
  },
  {
    name     : 'picture',
    component: () => import('@/components/partials/picture.partial.vue'),
  },
  {
    name     : 'textblock',
    component: () => import('@/components/partials/textblock.partial.mail.vue'),
  },
]
  