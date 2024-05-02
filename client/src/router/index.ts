/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
//import { createRouter, createWebHistory } from 'vue-router'

// const routes = [
//   { path: '/articles', component: articles },
//   { path: '/bar', component: Bar }
// ]



// const router = createRouter({
//   //history: createWebHistory(process.env.BASE_URL),
// })


import { createMemoryHistory, createRouter } from 'vue-router'

import home from './../pages/index.vue'
import articles from './../pages/articles.vue'
import calc from './../pages/calc.vue'

const routes = [
  { path: '/', component: home },
  { path: '/articles', component: articles },
  { path: '/calc', component: calc },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
export default router
