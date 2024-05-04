<template>
  <div className="checkout-container">
    <section class="page-header">
            <div class="overly"></div> 	
            <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                <div class="content text-center">
                    <h1 class="mb-3">Đơn hàng</h1>
                    <p>Tiến hành theo dõi đơn hàng của bạn tại đây, chúng tôi sẽ liên hệ với bạn, thường xuyên cập nhật tình trạng đơn hàng đến vớI bạn</p>
        
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-transparent justify-content-center">
                    <li class="breadcrumb-item"><router-link to="/">Trang chủ</router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Đơn hàng</li>
                    </ol>
                </nav>
                </div>
                </div>
            </div>
            </div>
        </section>
    <section class="cart shopping page-wrapper">
            <div class="container">
                <h3>Đơn đã đặt hàng</h3>
                <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="product-list">
                        <div class="cart-form">
                            <table class="table shop_table shop_table_responsive cart" cellspacing="0">
                                <thead>
                                <tr>
                                    <th class="product-name no-warp">Tên khách hàng</th>
                                    <th class="product-name no-warp">Số điện thoại</th>
                                    <th class="product-name no-warp">Email</th>
                                    <th class="product-quantity no-warp">Ghi chú</th>
                                    <th class="product-quantity no-warp">Ngày đặt hàng</th>
                                    <th class="product-quantity no-warp">Trạng thái</th>
                                    <th class="product-subtotal"></th>
                                </tr>
                                </thead>
        
                                <tbody>
                                <tr v-for="item in orderList" :key="item.orderID" class="cart_item">
                                    <td class="product-thumbnail no-warp">
                                      {{ item.userName }}
                                    </td>
                                    <td class="product-thumbnail no-warp">
                                      {{ item.phoneNumber }}
                                    </td>
                                    <td class="product-thumbnail no-warp">
                                      {{ item.email }}
                                    </td>
                                    <td class="product-thumbnail">
                                      {{ item.description }}
                                    </td>
                                    <td class="product-thumbnail">
                                      {{ Base.formatDateDDMMYYYYHHMMSS(item.modifiedDate + '') }}
                                    </td>
                                    <td class="product-thumbnail">
                                      <span> {{ Base.formatStatus(item.status) }}</span>
                                    </td>
                                    <td class="product-thumbnail">
                                      <button @click="showOrderDetail(item.orderID)" type="button" class="btn-coupon btn btn-black btn-small" name="apply_coupon">Xem chi tiết</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </section>
            <!-- Button trigger modal -->
<button style="opacity: 0; visibility: hidden;" type="button" class="btn btn-primary" id="openDetail" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade bd-example-modal-xl" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Chi tiết đơn hàng</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <section style="padding: 0 !important;" class="cart shopping page-wrapper">
            <div class="container">
                <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="product-list">
                        <div class="cart-form">
                          <p>
                            Đơn hàng: {{ orderDetail.userName }} - {{ orderDetail.phoneNumber }} - {{ orderDetail.email }} - {{ Base.formatDateDDMMYYYYHHMMSS(orderDetail.modifiedDate + '') }}
                            <br>
                            Địa chỉ: {{ orderDetail.address }} -  {{ orderDetail.ward }} -  {{ orderDetail.district }} -  {{ orderDetail.province }}
                            <br>
                            Ghi chú: {{ orderDetail.description }}
                            <br>
                            Trạng thái: {{ Base.formatStatus(orderDetail.status) }}
                          </p>
                            <table class="table shop_table shop_table_responsive cart" cellspacing="0">
                                <thead>
                                <tr>
                                    <th class="product-thumbnail">Hình ảnh</th>
                                    <th class="product-name">Sản phẩm</th>
                                    <th class="product-price">Giá</th>
                                    <th class="product-quantity">Số lượng</th>
                                    <th class="product-subtotal">Tổng</th>
                                </tr>
                                </thead>
        
                                <tbody>
                                <tr v-for="item in orderDetail?.orderDetail" :key="item.productID" class="cart_item">
                                    <td class="product-thumbnail" data-title="Thumbnail">
                                      <img :src="environment.IMAGE_API + item.avatar" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                                    </td>
        
                                    <td class="product-name" data-title="Product">
                                      {{ item.productName }}
                                    </td>
        
                                    <td class="product-price" data-title="Price">
                                        <span class="amount"><span class="currencySymbol"><pre wp-pre-tag-3=""></pre>
                                        </span>{{ Base.Comma(item.priceOrder) }} đ</span>
                                    </td>
                                    <td class="product-quantity" data-title="Quantity">
                                        <div class="quantity">
                                            <span>{{ item.quantity }}</span>
                                        </div>
                                    </td>
                                    <td class="product-subtotal" data-title="Total">
                                        <span class="amount">
                                            <span class="currencySymbol">
                                            <pre wp-pre-tag-3=""></pre>
                                            </span>{{ Base.Comma(item.priceOrder * item.quantity) }} đ
                                        </span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
                <div class="row" style="justify-content: space-between;">
                  <div class="col-lg-6">
                    <div class="cart-info card p-4 mt-4">
                        <h4 class="mb-4">Trạng thái đơn hàng</h4>
                        <p v-for="(item, index) in statusList" :key="index" style="margin: 0;"> - {{ item.Comment }} ({{ Base.formatDateDDMMYYYYHHMMSS(item.CreatedDate + '') }})</p>
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="cart-info card p-4 mt-4">
                        <h4 class="mb-4">tổng số giỏ hàng</h4>
                        <ul class="list-unstyled mb-4">
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Tổng tiền sản phẩm</h5>
                            <span>{{ Base.Comma(Base.calcTotalPriceOrder(orderDetail)) }} đ</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Giảm giá</h5>
                            <span>{{ orderDetail.couponCode }} ({{ orderDetail.percent }}%) (-{{ Base.Comma((Base.calcTotalPriceOrder(orderDetail) * ((orderDetail.percent ? orderDetail.percent : 0) / 100))) }} đ)</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Phí ship</h5>
                            <span>Miễn phí</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2">
                            <h5>Thành tiền</h5>
                            <span>{{ Base.Comma(Base.calcTotalPriceOrder(orderDetail) - (Base.calcTotalPriceOrder(orderDetail) * (orderDetail.percent / 100))) }} đ</span>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </section>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-coupon" data-dismiss="modal">Đóng</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script setup lang="ts">
import { Grid, Order } from '@/core/public_api';
import { onBeforeMount, reactive, ref } from 'vue';
import CartApi from '@/api/module/cart';
import { environment } from '@/environments/environment.prod';

const api:CartApi = new CartApi();

const Base:Grid = reactive(new Grid(api));
const orderList = ref<Order []>([]);
const orderDetail = ref<Order>(new Order()); 
const statusList:any = ref([]);
function showOrderDetail(orderID: string){
  Base.apiService.callApi(api.getStatusOrder, {v_OrderID: orderID}, (res: any) => {
    statusList.value = [...res];
  });
  Base.apiService.callApi(api.getOrderByID, {v_OrderID: orderID}, (res: any)=> {
    orderDetail.value = res;
    const elm = document.getElementById('openDetail');
    if(elm){
      elm?.click();
    }
  });
}

onBeforeMount(() => {
  Base.apiService.callApi(api.getOrderUser, {v_CurrentUser: Base.currentUser.currentUser}, (res: any)=> {
    orderList.value = res;
  });
  window.scrollTo({
    top: 0,
  })
});
</script>

<style scoped>
.btn-coupon{
  margin-left: 8px;
  padding: 4px 8px;
  height: 45px;
  width: 150px;
}
.no-warp{
  white-space: nowrap !important;
}
</style>