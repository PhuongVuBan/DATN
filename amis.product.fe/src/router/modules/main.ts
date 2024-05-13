import home from './main/home';
import cash from './main/cash';
import inventory from './main/inventory';

const router: any = [
  {
    /** 
     * Module trang chủ 
     * HAN - 08.03.2023
     * */
    path: '/',
    children: [...home],
  },
  {
    /** 
     * Module trang tiền mặt 
     * HAN - 08.03.2023
     * */
    path: '/cash',
    children: [...cash],
  },
  {
    /** 
     * Module trang kho 
     * HAN - 08.03.2023
     * */
    path: '/inventory',
    children: [...inventory],
  },
  {
    /** 
     * Trang kho
     * HAN - 08.03.2023
     * */
    path: '/category',
    component: () => import('../../views/main/inventory/category/CategoryPage.vue'),
    meta: { title: 'page.category' }
  },
  {
    /** 
     * Trang kho
     * HAN - 08.03.2023
     * */
    path: '/origin',
    component: () => import('../../views/main/inventory/origin/OriginPage.vue'),
    meta: { title: 'page.origin' }
  },
  {
    /** 
     * Trang kho
     * HAN - 08.03.2023
     * */
    path: '/trademark',
    component: () => import('../../views/main/inventory/trademark/TrademarkPage.vue'),
    meta: { title: 'page.trademark' }
  },
  {
    /** 
     * Trang order
     * HAN - 08.03.2023
     * */
    path: '/order',
    component: () => import('../../views/main/order/OrderPage.vue'),
    meta: { title: 'page.order' }
  },
  {
    /** 
     * Trang order
     * HAN - 08.03.2023
     * */
    path: '/coupon',
    component: () => import('../../views/main/coupon/CouponPage.vue'),
    meta: { title: 'page.coupon' }
  },
  {
    /** 
     * Trang không tồn tại 
     * HAN - 08.03.2023
     * */
    path: '/not-found',
    component: () => import('../../views/main/not-found/NotFound.vue'),
    meta: { title: 'page.not_found' }
  },
  {
    /** 
     * Trang không tồn tại 
     * HAN - 08.03.2023
     * */
    path: '/feature-built',
    component: () => import('../../views/main/Construction/ConstructionPage.vue'),
    meta: { title: 'page.construction_page' }
  },
]

export default router;