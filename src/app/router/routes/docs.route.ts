import DocsView from '@/pages/docs/docs/DocsView.vue'
import ColorsView from '@/pages/docs/docs/colors/ColorsView.vue'

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
