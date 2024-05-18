import { ApiService, Cart, CartDetail, CurrentUser, Order, OrderDetail, StatusOrder } from '@/core/public_api';
import { Utils } from './utils';
import type BaseApi from '@/api/base_api';
import CartApi from '@/api/module/cart';
import Swal from 'sweetalert2/dist/sweetalert2.js'

/** 
 * Chứa toàn bộ các base thêm sửa xoá được xây dựng
 * HAN - 08.03.2023
 */
export class Grid extends Utils{
  /** Api được truyền vào từ lớp khởi tạo */
  public api: BaseApi;
  public apiCart:CartApi = new CartApi();

  /** Key word tìm kiếm mặc định */
  public keyword:string = '';
  public currentUser:CurrentUser = this.store.state.config.currentUser;

  constructor(api: any){
    super();
    this.api = api;
  }
  
  /** Hàm gọi api */
  public apiService = new ApiService();

  public calcTotalPriceCart = (cart: Cart) => {
    let total = 0;
    cart.cartDetail.forEach((item: CartDetail) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  public calcTotalPriceOrder = (cart: Order) => {
    let total = 0;
    cart.orderDetail.forEach((item: OrderDetail) => {
      total += item.priceOrder * item.quantity;
    });
    return total;
  }

  public loadCart = () => {
    this.apiService.callApi(this.api.getRecordApi, {recordId: this.currentUser.currentUser}, (res: any)=> {
      this.store.dispatch(`config/setCartAction`, res);
    });
  }
  public addToCart = (productID: string, cart = false) => {
    this.apiService.callApi(this.apiCart.updateCart, {v_CurrentUser: this.currentUser.currentUser, v_ProductID: productID, v_State: 'add'}, (res: any)=> {
      this.store.dispatch(`config/setCartAction`, res);
      if(!cart){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm giỏ hàng thành công',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
  public deleteToCart = (product: CartDetail) => {
    if(product.quantity == 1){
      Swal.fire({
        title: 'Bạn có chắc chắn?',
        text: "Bạn có chắc muốn xoá sản phẩm khỏi giỏ hàng!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xoá khỏi giỏ',
        cancelButtonText: 'Huỷ'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.callApi(this.apiCart.updateCart, {v_CurrentUser: this.currentUser.currentUser, v_ProductID: product.productID, v_State: 'remove'}, (res: any)=> {
            this.store.dispatch(`config/setCartAction`, res);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Đã xoá sản phẩm khỏi giỏ hàng',
              showConfirmButton: false,
              timer: 1500
            })
          });
        }
      })
    }
    else {
      this.apiService.callApi(this.apiCart.updateCart, {v_CurrentUser: this.currentUser.currentUser, v_ProductID: product.productID, v_State: 'delete'}, (res: any)=> {
        this.store.dispatch(`config/setCartAction`, res);
      });
    }
  }
  public removeToCart = (productID: string) => {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: "Bạn có chắc muốn xoá sản phẩm khỏi giỏ hàng!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xoá khỏi giỏ',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.callApi(this.apiCart.updateCart, {v_CurrentUser: this.currentUser.currentUser, v_ProductID: productID, v_State: 'remove'}, (res: any)=> {
          this.store.dispatch(`config/setCartAction`, res);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Đã xoá sản phẩm khỏi giỏ hàng',
            showConfirmButton: false,
            timer: 1500
          })
        });
      }
    })
  }

  public formatStatus = (status: StatusOrder) => {
    return status === StatusOrder.WaitConfirm ? "Chờ xác nhận" :
    status === StatusOrder.Confirm ? "Đã xác nhận" :
    status === StatusOrder.Delivery ? "Đang giao hàng" :
    status === StatusOrder.Delivered ? "Đã giao hàng" :
    status === StatusOrder.Destroy ? "Đơn đã bị huỷ" : ""
  }
}