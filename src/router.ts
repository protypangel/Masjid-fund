import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('./views/HomePage.vue')
const SuiviPage = () => import('./views/SuiviPage.vue')
const TestPage = () => import('./views/TestPage.vue')

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', name: 'home', component: HomePage, meta: { index: 0} },
		{ path: '/suivi', name: 'suivi', component: SuiviPage, meta: { index: 1} },	
		{ path: '/test', name: 'test', component: TestPage, meta: { index: 2} },
	],
})

export default router 