import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomePage.vue'),
      meta: { title: 'Trang chủ' }
    },
    {
      path: '/shop',
      component: () => import('../views/ShopView.vue'),
      meta: { title: 'Sản phẩm' }
    },
    {
      path: '/cart',
      component: () => import('../views/TheCart.vue'),
      meta: { title: 'Giỏ hàng' }
    },
    {
      path: '/checkout',
      component: () => import('../views/TheCheckOut.vue'),
      meta: { title: 'Thanh toán' }
    },
    {
      path: '/order',
      component: () => import('../views/OrderPage.vue'),
      meta: { title: 'Quản lý đơn hàng' }
    },
    {
      path: '/productDetails',
      component: () => import('../views/ProductPageDetail.vue'),
      meta: { title: 'Chi tiết sản phẩm' }
    },
  ]
})
router.beforeEach((to: any, from: any, next: any) => {
  document.title = to.meta.title;
  next();
})

export default router
