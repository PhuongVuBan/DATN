<template>
  <div className="home-container">
          <div className="main-slider slider slick-initialized slick-slider">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="3000">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img class="d-block w-100" src="../assets/images/slideshow1-1.jpg" alt="First slide">
                    </div>
                    <div class="carousel-item">
                    <img class="d-block w-100" src="../assets/images/slideshow1-2.jpg" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                    <img class="d-block w-100" src="../assets/images/slideshow1-3.jpg" alt="Third slide">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
          </div>

          <section class="section products-main">
              <div class="container">
                  <div class="row justify-content-center">
                      <div class="col-lg-8">
                          <div class="title text-center">
                              <h2>Mới</h2>
                              <p>Doanh số bán hàng trực tuyến tốt nhất để mua sắm vào cuối tuần này</p>
                          </div>
                      </div>
                  </div>
          
          
                <div class="row">
                    <div v-for="item in ProductHome" :key="item.productID" class="col-lg-3 col-12 col-md-6 col-sm-6 mb-5 " >
                        <div class="product">
                            <div class="product-wrap">
                                <RouterLink :to="`/productDetails?productID=${item.productID}`"><img class="img-fluid w-100 mb-3 img-first" :src="environment.IMAGE_API + item.avatar" alt="product-img" /></RouterLink>
                            </div>
                
                            <div class="product-hover-overlay">
                                <RouterLink to="/" @click="Base.addToCart(item.productID)"><i class="tf-ion-android-cart"></i></RouterLink>
                                </div>
                
                            <div class="product-info">
                                <h2 class="product-title h5 mb-0"><RouterLink :to="`/productDetails?productID=${item.productID}`">{{ item.productName }}</RouterLink></h2>
                                <span class="price">
                                    {{ Base.Comma(item.price) }} đ
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
          </section>

          <section class="section products-list">
          <div class="container">
              <div class="row">
              <div class="col-lg-4 col-sm-12 col-md-12">
                  <img src="../../src/assets/images/adsv.jpg" alt="Product big thumb"  class="img-fluid w-100" />
              </div>

              <div class="col-lg-4 col-sm-6 col-md-6">
                  <div class="widget-featured-entries mt-5 mt-lg-0">
                  <h4 class="mb-4 pb-3">Sản phẩm hot nhất</h4>

                          <div v-for="item in ProductHot" :key="item.productID" class="media mb-3">
                            <RouterLink class="featured-entry-thumb" :to="`/productDetails?productID=${item.productID}`">
                                <img :src="environment.IMAGE_API + item.avatar" alt="Product thumb" width="64" class="img-fluid mr-3" />
                            </RouterLink>
                            <div class="media-body">
                                <h6 class="featured-entry-title mb-0"><RouterLink :to="`/productDetails?productID=${item.productID}`">{{ item.productName }}</RouterLink></h6>
                                <p class="featured-entry-meta">{{ Base.Comma(item.price) }} đ</p>
                            </div>
                          </div>
                  </div>
              </div>


              <div class="col-lg-4 col-sm-6 col-md-6">
                  <div class="widget-featured-entries mt-5 mt-lg-0">
                  <h4 class="mb-4 pb-3">Sản phẩm giá tốt nhất</h4>

                          <div v-for="item in ProductPrice" :key="item.productID"  class="media mb-3">
                                <RouterLink class="featured-entry-thumb" :to="`/productDetails?productID=${item.productID}`">
                                    <img :src="environment.IMAGE_API + item.avatar" alt="Product thumb" width="64" class="img-fluid mr-3" />
                                </RouterLink>
                          <div class="media-body">
                              <h6 class="featured-entry-title mb-0"><RouterLink :to="`/productDetails?productID=${item.productID}`">{{ item.productName }}</RouterLink></h6>
                              <p class="featured-entry-meta">{{ Base.Comma(item.price) }} đ</p>
                          </div>
                          </div>
                  </div>
              </div>
              </div>
          </div>
          </section>
          <section class="features border-top">
          <div class="container">
              <div class="row">
              <div class="col-lg-3 col-sm-6 col-md-6">
                  <div class="feature-block">
                  <i class="tf-ion-android-bicycle"></i>
                  <div class="content">
                      <h5>Miễn phí ship</h5>
                      <p>Tất cả đơn hàng</p>
                  </div>
                  </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-md-6">
                  <div class="feature-block">
                  <i class="tf-wallet"></i>
                  <div class="content">
                      <h5>30 Ngày hoàn trả</h5>
                      <p>Tiền hoàn lại ví</p>
                  </div>
                  </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-md-6">
                  <div class="feature-block">
                  <i class="tf-key"></i>
                  <div class="content">
                      <h5>Thanh toán an toàn</h5>
                      <p>Tin cậy, tiện ích, tận tình</p>
                  </div>
                  </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-md-6">
                  <div class="feature-block">
                  <i class="tf-clock"></i>
                  <div class="content">
                      <h5>24/7 Hỗ trợ</h5>
                      <p>Hỗ trợ khách hàng mọi lúc </p>
                  </div>
                  </div>
              </div>
              </div>
          </div>
          </section>
      </div>
</template>

<script setup lang="ts">
import { Grid, Product } from '@/core/public_api';
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import ProductApi from '@/api/module/product';
import { environment } from '@/environments/environment.prod';

const api:ProductApi = new ProductApi();
const keyWord: any = computed(() => Base.store.state.config.keyWord);

/** Sử dụng base thư viện Grid đã viết */
const Base:Grid = reactive(new Grid(api));
const ProductHome = ref<Product []>([]);
const ProductHot = ref<Product []>([]);
const ProductPrice = ref<Product []>([]);
watch(keyWord, ()=> {
    Base.apiService.callApi(api.getProductHome, {v_KeyWord: keyWord.value}, (res: any)=> {
        ProductHome.value = res;
    });  
})
onBeforeMount(() => {
    Base.apiService.callApi(api.getProductHome, {v_KeyWord: keyWord.value}, (res: any)=> {
        ProductHome.value = res;
    });  
    Base.apiService.callApi(api.getProductHot, null, (res: any)=> {
        ProductHot.value = res;
    });  
    Base.apiService.callApi(api.getProductPrice, null, (res: any)=> {
        ProductPrice.value = res;
    });  
})

</script>

<style scoped>

</style>