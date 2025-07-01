import { createRouter, createWebHistory } from 'vue-router'
import HomeRoute from '@/router/routes/Home.route.ts'
import ToDoRoute from '@/router/routes/ToDo.route.ts'
import DocsRoute from '@/router/routes/Docs.route.ts'
import NotesRoute from '@/router/routes/Notes.route.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [HomeRoute, ToDoRoute, NotesRoute, DocsRoute],
})

export default router
