import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('./views/HomePage.vue')
const SuiviPage = () => import('./views/SuiviPage.vue')

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', name: 'home', component: HomePage, meta: { index: 0} },
		{ path: '/recap', name: 'recap', component: SuiviPage, meta: { index: 1} },
	],
})

export default router 