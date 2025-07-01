import DocsView from '@/views/docs/DocsView.vue'
import ColorsView from '@/views/docs/components/ColorsView.vue'

export default {
  path: '/docs',
  name: 'docs',
  component: DocsView,
  redirect: '/colors',
  meta: {
    layout: 'only-header',
  },
  children: [
    {
      path: '/colors',
      name: 'docs-colors',
      component: ColorsView,
    },
  ],
}
