const router: any = [
  {
    /** 
     * Trang tiền mặt 
     * HAN - 08.03.2023
     * */
    path: '/cash',
    component: () => import('../../../views/main/cash/cashMain/CashMain.vue'),
    meta: { title: 'page.cash_main' }
  },
  {
    /** 
     * Trang nhân viên
     * HAN - 08.03.2023
     *  */
    path: '/cash/employee',
    component: () => import('../../../views/main/cash/employee/EmployeePage.vue'),
    meta: { title: 'page.employee' }
  },
  {
    /** 
     * Trang đơn vị
     * HAN - 08.03.2023
     *  */
    path: '/cash/branch',
    component: () => import('../../../views/main/cash/branch/BranchPage.vue'),
    meta: { title: 'page.branch' }
  },
]

export default router;