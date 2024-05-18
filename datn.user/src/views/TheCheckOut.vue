<template>
  <div className="checkout-container">
    <section class="page-header">
      <div class="overly"></div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="content text-center">
              <h1 class="mb-3">Thanh toán</h1>
              <p>
                Tiến hành thanh toán để xác nhận đơn hàng của bạn với chúng tôi,
                chúng tôi sẽ liên hệ với bạn thời gian sớm nhất
              </p>

              <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent justify-content-center">
                  <li class="breadcrumb-item">
                    <router-link to="/">Trang chủ</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Thanh toán
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="page-wrapper">
      <div class="checkout shopping">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 pr-5">
              <div class="billing-details mt-5">
                <h4 class="mb-4">Chi tiết thanh toán</h4>
                <form class="checkout-form">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group mb-4">
                        <label for="first_name"
                          >Nhập tên của bạn (* Bắt buộc điền)</label
                        >
                        <input
                          v-model="order.userName"
                          type="text"
                          class="form-control"
                          id="first_name"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group mb-4">
                        <label for="last_name"
                          >Số điện thoại (* Bắt buộc điền)</label
                        >
                        <input
                          v-model="order.phoneNumber"
                          type="text"
                          class="form-control"
                          id="last_name"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-group mb-4">
                        <label for="company_name"
                          >Địa chỉ email của bạn (* Bắt buộc điền)</label
                        >
                        <input
                          v-model="order.email"
                          type="text"
                          class="form-control"
                          id="company_name"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div class="col-lg-6">
                      <div class="form-group mb-4">
                        <label for="company_name"
                          >Tỉnh/ thành phố (* Bắt buộc điền)</label
                        >
                        <select
                          @change="changeAddress('province')"
                          v-model="order.province"
                          class="form-control"
                        >
                          <option value="">Chọn tỉnh/ thành phố</option>
                          <option
                            v-for="(item, index) in address.province"
                            :key="index"
                            :value="item.id"
                          >
                            {{ item._name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group mb-4">
                        <label for="company_name"
                          >Quận huyện (* Bắt buộc điền)</label
                        >
                        <select
                          @change="changeAddress('district')"
                          v-model="order.district"
                          class="form-control"
                        >
                          <option value="">Chọn quận huyện</option>
                          <option
                            v-for="(item, index) in address.district"
                            :key="index"
                            :value="item.id"
                          >
                            {{ item._name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group mb-4">
                        <label for="company_name"
                          >Phường xã (* Bắt buộc điền)</label
                        >
                        <select v-model="order.ward" class="form-control">
                          <option value="">Chọn Phường xã</option>
                          <option
                            v-for="(item, index) in address.ward"
                            :key="index"
                            :value="item._name"
                          >
                            {{ item._name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="col-lg-6">
                      <div class="form-group mb-4">
                        <label for="first_name"
                          >ĐC hi tiết (VD: Toà nhà N03T6) (* Bắt buộc
                          điền)</label
                        >
                        <input
                          v-model="order.address"
                          type="text"
                          class="form-control"
                          id="street"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="form-group mb-4">
                        <label for="first_name"
                          >Ghi chú đặt hàng (tùy chọn)</label
                        >
                        <textarea
                          v-model="order.description"
                          class="form-control"
                          id="msg"
                          cols="30"
                          rows="5"
                          placeholder="Ghi chú về thứ tự đơn hàng của bạn muốn?"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="product-checkout-details mt-5 mt-lg-0">
                <h4 class="mb-4 border-bottom pb-4">Tóm tắt đơn hàng</h4>
                <div class="coupon">
                  <input
                    v-model="coupon"
                    type="text"
                    name="coupon_code"
                    class="input-text form-control"
                    id="coupon_code"
                    placeholder="Mã giảm giá"
                  />
                  <button
                    @click="applyCoupon"
                    type="button"
                    class="btn-coupon btn btn-black btn-small"
                    name="apply_coupon"
                  >
                    Áp dụng
                  </button>
                  <span class="float-right mt-3 mt-lg-0"> </span>
                </div>

                <div
                  v-for="item in cart?.cartDetail"
                  :key="item.productID"
                  class="media product-card"
                >
                  <p>{{ item.productName }}</p>
                  <div class="media-body text-right">
                    <p style="white-space: nowrap" class="h5">
                      {{ item.quantity }} x {{ Base.Comma(item.price) }} đ
                    </p>
                  </div>
                </div>

                <ul class="summary-prices list-unstyled mb-4">
                  <li class="d-flex justify-content-between">
                    <span>Tổng phụ:</span>
                    <span class="h5"
                      >{{ Base.Comma(Base.calcTotalPriceCart(cart)) }} đ</span
                    >
                  </li>
                  <li class="d-flex justify-content-between">
                    <span>Giảm giá:</span>
                    <span class="h5"
                      >{{ cart.couponCode }} ({{ percent ? percent : 0 }}%) (-{{
                        Base.Comma(
                          Base.calcTotalPriceCart(cart) *
                            ((percent ? percent : 0) / 100)
                        )
                      }}
                      đ)</span
                    >
                  </li>
                  <li class="d-flex justify-content-between">
                    <span>Phí ship:</span>
                    <span class="h5">Miễn phí</span>
                  </li>
                  <li class="d-flex justify-content-between">
                    <span>Thành tiền</span>
                    <span class="h5"
                      >{{
                        Base.Comma(
                          Base.calcTotalPriceCart(cart) -
                            Base.calcTotalPriceCart(cart) *
                              ((percent ? percent : 0) / 100)
                        )
                      }}
                      đ</span
                    >
                  </li>
                </ul>

                <form action="#">
                  <div class="form-check mb-3">
                    <input
                      v-model.number="order.typeCheckout"
                      class="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      :value="0"
                      checked
                    />
                    <label class="form-check-label" for="exampleRadios1">
                      Chuyển khoản trực tiếp
                    </label>
                    <div class="coupon-notice">
                      <div class="bg-light p-3">
                        Thanh toán với chúng tôi: VU NGOC PHUONG <br />
                        VIETTINBANK
                        <br />
                        109872571189
                        <br />
                        Chúng tôi sẽ liên hệ thanh toán với bạn, hãy giữ lại
                        bill
                      </div>
                    </div>
                    <div class="alert alert-secondary mt-3" role="alert">
                      Thực hiện thanh toán của bạn trực tiếp vào tài khoản ngân
                      hàng của chúng tôi. Vui lòng sử dụng ID đơn đặt hàng của
                      bạn làm tham chiếu thanh toán. Đơn đặt hàng của bạn sẽ
                      không được giao cho đến khi số tiền trong tài khoản của
                      chúng tôi được thanh toán.
                    </div>
                  </div>

                  <div class="form-check mb-3">
                    <input
                      v-model.number="order.typeCheckout"
                      class="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      :value="1"
                    />
                    <label class="form-check-label" for="exampleRadios2">
                      Kiểm tra hàng và thanh toán
                    </label>
                  </div>
                </form>

                <div class="info mt-4 border-top pt-4 mb-5">
                  Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn đặt hàng,
                  hỗ trợ trải nghiệm của bạn trên trang web này và cho các mục
                  đích khác được mô tả trong chính sách bảo mật của chúng tôi.
                </div>
                <router-link
                  to="/checkout"
                  @click="checkout"
                  class="btn btn-main btn-small"
                  >Đặt hàng</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="coupon-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content py-5">
          <div class="modal-body">
            <form>
              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Enter Coupon Code"
                />
              </div>
              <button
                type="button"
                class="btn btn-main btn-small"
                data-dismiss="modal"
              >
                Apply Coupon
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartApi from "@/api/module/cart";
import CouponApi from "@/api/module/coupon";
import { Cart, Grid, Order } from "@/core/public_api";
import { computed, onBeforeMount, reactive, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

const api: CartApi = new CartApi();
const couponApi: CouponApi = new CouponApi();
const Base: Grid = reactive(new Grid(api));

const cart = computed<Cart>(() => Base.store.state.config.cart);
const order = ref<Order>(new Order());
const percent = ref(0);
const coupon = ref("");
function applyCoupon() {
  Base.apiService.callApi(
    couponApi.getRecordByCode,
    coupon.value,
    (res: any) => {
      if (res && res.percent) {
        percent.value = res.percent;
        order.value.couponID = res.couponID;
      } else {
        percent.value = 0;
        order.value.couponID = "";
      }
    }
  );
}

function checkout() {
  if (cart.value.cartDetail.length === 0) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Hãy chọn mua sản phẩn vào giỏ hàng rồi thanh toán",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }
  if (
    !order.value.userName.trim() ||
    !order.value.phoneNumber.trim() ||
    !order.value.email.trim() ||
    !order.value.province ||
    !order.value.ward ||
    !order.value.district ||
    !order.value.address.trim()
  ) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Vui lòng điền đầy đủ thông tin mua hàng",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }
  order.value.currentUser = Base.currentUser.currentUser;
  Swal.fire({
    title: "Xác nhận thanh toán đặt hàng?",
    text: "Đơn hàng của bạn sẽ được lên lịch thanh toán và vận chuyển đến bạn!",
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Huỷ",
  }).then((result) => {
    if (result.isConfirmed) {
      order.value.province = address.value.province.find(
        (item: any) => item.id == order.value.province
      )._name;
      order.value.district = address.value.district.find(
        (item: any) => item.id == order.value.district
      )._name;
      Base.apiService.callApi(
        Base.apiCart.checkout,
        order.value,
        (res: any) => {
          Base.store.dispatch(`config/setCartAction`, new Cart());
          order.value = new Order();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title:
              "Đã xác nhận đơn hàng, hãy đến quản lý đơn hàng để theo dõi đơn hàng",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    }
  });
}

const address: any = ref({
  province: [],
  district: [],
  ward: [],
});

function changeAddress(value: string) {
  if (value == "province") {
    address.value.district = [];
    address.value.ward = [];
    order.value.district = "";
    order.value.ward = "";
    Base.apiService.callApi(
      Base.apiCart.getAddress,
      { v_Address: "district", v_ID: Number(order.value.province) },
      (res: any) => {
        address.value.district = res;
      }
    );
  } else if (value == "district") {
    address.value.ward = [];
    order.value.ward = "";
    Base.apiService.callApi(
      Base.apiCart.getAddress,
      { v_Address: "ward", v_ID: Number(order.value.district) },
      (res: any) => {
        address.value.ward = res;
      }
    );
  }
}

onBeforeMount(() => {
  Base.apiService.callApi(
    Base.apiCart.getAddress,
    { v_Address: "province", v_ID: 0 },
    (res: any) => {
      address.value.province = res;
    }
  );
  window.scrollTo({
    top: 0,
  });
});
</script>

<style scoped>
.coupon {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.btn-coupon {
  margin-left: 8px;
  padding: 4px 8px;
  height: 45px;
  width: 150px;
}
</style>
