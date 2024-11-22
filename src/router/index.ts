import { createWebHistory } from 'vue-router'
import { createRouter } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => setupLayouts(routes)
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

  // 로그아웃 상태 : 마이페이지 접근 할 때
  if (to.path.includes('/mypage')) {
    if (isAuthenticated === false) {
      alert('마이페이지는 로그인 후 이용해주세요.')
      return '/member/login'
    }
  }

  // 실내정원용 식물 필터 세션 종료
  if (to.matched[0].path !== '/indoor') {
    sessionStorage.removeItem('light')
    sessionStorage.removeItem('growForm')
    sessionStorage.removeItem('leafColor')
    sessionStorage.removeItem('leafPattern')
    sessionStorage.removeItem('flowerColor')
    sessionStorage.removeItem('fruitColor')
    sessionStorage.removeItem('flowering')
    sessionStorage.removeItem('minTemp')
    sessionStorage.removeItem('waterCycle')
  }
})

export default router
