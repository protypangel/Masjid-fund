import { createRouter, createWebHistory } from 'vue-router'

const PresentationPage = () => import('./views/PresentationPage.vue')
const RecapPage = () => import('./views/RecapPage.vue')

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', name: 'home', component: PresentationPage },
		{ path: '/recap', name: 'recap', component: RecapPage },
	],
	scrollBehavior() {
		return { top: 0 }
	}
})

export default router 