<template>
   <nav style="top: 0; margin: 0;" class="navbar fixed-top navbar-expand-lg navbar-light bg-white w-100 navigation" id="navbar">
        <div class="container">
            <RouterLink class="navbar-brand font-weight-bold" to="/">VNP FASHION
            </RouterLink>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar"
            aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="main-navbar">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item active">
                    <RouterLink class="nav-link" to="/">Trang chủ</RouterLink>
                </li>
                <li class="nav-item">
                <router-link class="nav-link" to="/order">Quản lý đơn hàng</router-link>
                </li>
                <li class="nav-item dropdown dropdown-slide">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-delay="350"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Xem shop
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown3">
                     
                    <li><RouterLink class="nav-link" to="/shop">Sản phẩm</RouterLink></li>
                    <li><RouterLink class="nav-link" to="/cart">Giỏ hàng</RouterLink></li>
                    <li><RouterLink class="nav-link" to="/checkout">Thanh toán</RouterLink></li>
                </ul>
                </li>
            </ul>
            </div>
        
            <ul class="top-menu list-inline mb-0 d-none d-lg-block" id="top-menu">
            <li class="list-inline-item">
              <input type="search" @input="handleSearchData" class="form-control rounded" placeholder="Tìm sản phẩm" aria-label="Search" aria-describedby="search-addon" />
            </li>
            <li class="dropdown cart-nav dropdown-slide list-inline-item">
                <router-link to="/cart" class="dropdown-toggle cart-icon" data-toggle="dropdown" data-hover="dropdown">
                  <i class="tf-ion-android-cart"></i>
                  <span v-if="cart?.cartDetail.length > 0">{{ cart?.cartDetail.length }}</span>
                </router-link>
                <div style="width: 350px !important;" class="dropdown-menu cart-dropdown">
               
                <div v-for="item in cart?.cartDetail" :key="item.productID" class="media">
                    <router-link :to="`/productDetails?productID=${item.productID}`">
                    <img class="media-object img- mr-3" :src="environment.IMAGE_API + item.avatar" alt="image" />
                    </router-link>
                    <div class="media-body">
                    <h6 style="margin-right: 42px;">{{ item.productName }}</h6>
                    <div class="cart-price">
                        <span>{{ item.quantity }} x</span>
                        <span>{{ Base.Comma(item.price) }} đ</span>
                    </div>
                    </div>
                    <a style="cursor: pointer;" class="remove" @click="Base.removeToCart(item.productID)"><i class="tf-ion-close"></i></a>
                </div>
                <div class="cart-summary">
                    <span class="h6">Tổng</span>
                    <span class="total-price h6">{{ Base.Comma(Base.calcTotalPriceCart(cart)) }} đ</span>
                    <div class="text-center cart-buttons mt-3">
                    <router-link to="/cart" class="btn btn-small btn-transparent btn-block">Giỏ hàng</router-link>
                    <router-link to="/checkout" class="btn btn-small btn-main btn-block">Thanh toán</router-link>
                    </div>
                </div>
                </div>
            </li>
            </ul>
        </div>
        </nav>
</template>
<script setup lang="ts">
import { Cart, Grid } from '@/core/public_api';
import { computed, onBeforeMount, reactive } from 'vue';
import CartApi from '@/api/module/cart';
import { environment } from '@/environments/environment.prod';

const api:CartApi = new CartApi();

const Base:Grid = reactive(new Grid(api));
function handleSearchData(event: any){
  Base.handleDebounce(600, async (event: any) => {
    Base.store.dispatch("config/setKeyWordAction", event.target.value.trim());
  }, event);
}

const cart = computed<Cart>(() => Base.store.state.config.cart);
onBeforeMount(() => {
  setTimeout(() => {
    Base.loadCart();
  }, 300);
});

</script>

<style scoped>
.dropdown-toggle.cart-icon{
  position: relative;
}
.dropdown-toggle.cart-icon span{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  background-color: #fb5c42;
  padding: 0px 3px;
  border-radius: 50%;
  line-height: 15px;
  width: 20px;
  height: 20px;
  top: -15px;
  right: -6px;
}
</style>