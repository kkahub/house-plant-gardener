import { createWebHistory } from 'vue-router'
import { createRouter } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => setupLayouts(routes)
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: HomeView
  //   },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (About.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import('../views/AboutView.vue')
  //   }
  // ]
})

router.beforeEach((to, from) => {
  // 네비게이션 가드
  const { isAuthenticated } = useAuthStore()

  // 로그인 상태 : 로그인 페이지로 이동하려고 할 때
  if (to.path === '/member/login') {
    if (isAuthenticated === true) {
      alert('이미 로그인 되어 있습니다.')
      return '/'
    }
  }

  // 실내정원용 식물 필터 세션 종료
  if (to.matched[0].path !== '/indoor') {
    sessionStorage.removeItem('light')
  }
})

export default router
