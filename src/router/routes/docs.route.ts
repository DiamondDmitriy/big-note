import DocsView from '@/views/docs/DocsView.vue'
import ColorsView from '@/views/docs/colors/ColorsView.vue'

export default {
  path: '/docs',
  name: 'docs',
  component: DocsView,
  redirect: '/colors',
  children: [
    {
      path: 'colors',
      name: 'docs-colors',
      component: ColorsView,
    },
  ],
}
