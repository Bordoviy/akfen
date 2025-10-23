// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import Contacts from '@/pages/Contacts.vue'
import ProjectDetail from '@/pages/ProjectDetail.vue'
import Mortgage from '@/pages/Mortgage.vue'
import Blog from '@/pages/Blog.vue'
import NotFound from '@/pages/NotFound.vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import SingleLayout from '@/pages/SingleLayout.vue'
import Installment from '@/pages/Installment.vue'
import Apartment from '@/pages/Apartment.vue'

const routes = [
  {
    path: '/',
    component: BaseLayout,
    meta: { breadcrumb: 'Главная' },
    children: [
      { path: '', component: Home, meta: { breadcrumb: 'Главная' } },
      { path: 'about', component: About, meta: { breadcrumb: 'О нас' } },
      { path: 'contacts', component: Contacts, meta: { breadcrumb: 'Контакты' } },
      { path: 'mortgage', component: Mortgage, meta: { breadcrumb: 'Ипотека' } },
      { path: 'installment', component: Installment, meta: { breadcrumb: 'Рассрочка' } },
      { path: 'blog', component: Blog, meta: { breadcrumb: 'Блог' } },
      // {
      //   path: 'blog/:slug',
      //   component: SingleLayout,
      //   props: true,
      //   meta: { breadcrumb: 'Запись блога' },
      // },
      { path: 'projects/:id', component: ProjectDetail, meta: { breadcrumb: 'Жилой дом' } },
      { path: 'apartment', component: Apartment, meta: { breadcrumb: 'Квартира' } },
      // ⬇️ 404 внутри BaseLayout
      {
        path: ':pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: { breadcrumb: 'Страница не найдена' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
