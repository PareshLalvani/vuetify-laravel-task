import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
              {    
                path: '/',
                redirect: '/login',
              },
              {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('./views/dashboard.vue')
              },
            ],
        },
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
              {
                path: '/login',
                name: 'login',
                component: () => import('./views/login/login.vue')
              },
              {
                path: '/error-404',
                name: 'page-error-404',
                component: () => import('@/views/error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/error-404'
        }
    ],
})

const checkToken = () => {
	if (localStorage.getItem('authToken') && localStorage.getItem('user')) {
		return true;
	} else {
		return false
	}
}
router.beforeEach((to, from, next) => {
	if (to.name !== 'login') {
		if (checkToken()) {
			next()
		} else {
			next()
			// next({
			// 	name: 'login'
			// })
		}
	}
	next()
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
