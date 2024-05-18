<template>
  <div className="checkout-container">
            <section class="page-header">
            <div class="overly"></div> 	
            <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                <div class="content text-center">
                    <h1 class="mb-3">Giỏ hàng</h1>
                    Tìm kiếm sản phẩm của chúng tôi, thêm giỏ hàng, thanh toán mua hàng
        
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-transparent justify-content-center">
                    <li class="breadcrumb-item"><router-link to="/">Trang chủ</router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Giỏ hàng</li>
                    </ol>
                </nav>
                </div>
                </div>
            </div>
            </div>
        </section>
        
        
        
            <section class="cart shopping page-wrapper">
            <div class="container">
                <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="product-list">
                        <div class="cart-form">
                            <table class="table shop_table shop_table_responsive cart" cellspacing="0">
                                <thead>
                                <tr>
                                    <th class="product-thumbnail"> </th>
                                    <th class="product-name">Sản phẩm</th>
                                    <th class="product-price">Giá</th>
                                    <th class="product-quantity">Số lượng</th>
                                    <th class="product-subtotal">Tổng</th>
                                    <th class="product-remove"> </th>
                                </tr>
                                </thead>
        
                                <tbody>
                                <tr v-for="item in cart?.cartDetail" :key="item.productID" class="cart_item">
                                    <td class="product-thumbnail" data-title="Thumbnail">
                                        <router-link :to="`/productDetails?productID=${item.productID}`"><img :src="environment.IMAGE_API + item.avatar" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" /></router-link>
                                    </td>
        
                                    <td class="product-name" data-title="Product">
                                        <router-link :to="`/productDetails?productID=${item.productID}`">{{ item.productName }}</router-link>
                                    </td>
        
                                    <td class="product-price" data-title="Price">
                                        <span class="amount"><span class="currencySymbol"><pre wp-pre-tag-3=""></pre>
                                        </span>{{ Base.Comma(item.price) }} đ</span>
                                    </td>
                                    <td class="product-quantity" data-title="Quantity">
                                        <div class="quantity">
                                            <button @click="Base.deleteToCart(item)" class="btn-check-cart btn btn-main btn-small" aria-label="Remove this item" data-product_id="30" data-product_sku="">-</button>
                                            <span>{{ item.quantity }}</span>
                                            <button @click="Base.addToCart(item.productID, true)" class="btn-check-cart btn btn-main btn-small" aria-label="Remove this item" data-product_id="30" data-product_sku="">+</button>
                                        </div>
                                    </td>
                                    <td class="product-subtotal" data-title="Total">
                                        <span class="amount">
                                            <span class="currencySymbol">
        <pre wp-pre-tag-3=""></pre>
                                            </span>{{ Base.Comma(item.price * item.quantity) }} đ</span>
                                    </td>
                                    <td class="product-remove" data-title="Remove">
                                        <router-link @click="Base.removeToCart(item.productID)" to="/cart" class="remove" aria-label="Remove this item" data-product_id="30" data-product_sku="">×</router-link>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
                <div class="row justify-content-end">
                    <div class="col-lg-4">
                    <div class="cart-info card p-4 mt-4">
                        <h4 class="mb-4">tổng số giỏ hàng</h4>
                        <ul class="list-unstyled mb-4">
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Tổng tiền sản phẩm</h5>
                            <span>{{ Base.Comma(Base.calcTotalPriceCart(cart)) }} đ</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Phí ship</h5>
                            <span>Miễn phí</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2">
                            <h5>Tổng tiền</h5>
                            <span>{{ Base.Comma(Base.calcTotalPriceCart(cart)) }} đ</span>
                            </li>
                        </ul>
                        <router-link to="/checkout" class="btn btn-main btn-small">Đi đến thanh toán</router-link>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
</template>

<script setup lang="ts">
import CartApi from "@/api/module/cart";
import { Cart, Grid } from "@/core/public_api";
import { computed, onBeforeMount, reactive } from "vue";
import { environment } from '@/environments/environment.prod';

const api:CartApi = new CartApi();
const Base:Grid = reactive(new Grid(api));

const cart = computed<Cart>(() => Base.store.state.config.cart);

onBeforeMount(() => {
    window.scrollTo({
        top: 0,
    })
})
</script>

<style scoped>
.btn-check-cart{
    width: 40px;
    height: 40px;
    margin: 8px;
    padding: 4px 4px;
}
</style>