<template>
  <div className="single-product-container">
    <section class="single-product">
      <div class="container">
        <div class="row">
          <div class="col-md-5">
            <div class="single-product-slider">
              <div
                class="carousel slide"
                data-ride="carousel"
                id="single-product-slider"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      :src="environment.IMAGE_API + product.avatar"
                      alt=""
                      class="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-7">
            <div class="single-product-details mt-5 mt-lg-0">
              <h2>{{ product.productName }}</h2>
              <div class="sku_wrapper mb-4">
                SKU: <span class="text-muted">{{ product.productCode }}</span>
              </div>

              <hr />

              <h3 class="product-price">{{ Base.Comma(product.price) }} đ</h3>

              <p class="product-description">
                Thời lượng pin: {{ product.batteryLife }}
              </p>
              <p class="product-description">
                Thương hiệu: {{ product.trademarkName }}
              </p>
              <p class="product-description">
                Xuất xứ: {{ product.originName }}
              </p>
              <p class="product-description">
                Thời hạn bảo hành: {{ product.warrantyPeriod }}
              </p>
              <p class="product-description">
                Chất liệu: {{ product.material }}
              </p>

              <form class="cart" action="#" method="post">
                <div class="quantity d-flex align-items-center">
                  <a
                    @click="Base.addToCart(product.productID)"
                    style="cursor: pointer"
                    class="btn btn-main btn-small"
                    >Thêm vào giỏ</a
                  >
                </div>
              </form>

              <div class="products-meta mt-4">
                <div class="product-category d-flex align-items-center">
                  <span
                    class="font-weight-bold text-capitalize product-meta-title"
                    >Danh mục :</span
                  >
                  <div>{{ product.categoryName }}</div>
                </div>

                <div class="product-share mt-5">
                  <ul class="list-inline">
                    <li class="list-inline-item">
                      <a href="#"><i class="tf-ion-social-facebook"></i></a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#"><i class="tf-ion-social-twitter"></i></a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#"><i class="tf-ion-social-linkedin"></i></a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#"><i class="tf-ion-social-pinterest"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <nav class="product-info-tabs wc-tabs mt-5 mb-5">
              <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                <a
                  class="nav-item nav-link active"
                  id="nav-home-tab"
                  data-toggle="tab"
                  href="#nav-home"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                  >Mô tả chi tiết</a
                >
              </div>
            </nav>

            <div
              class="tab-content"
              id="nav-tabContent"
              v-html="product.description"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <section class="products related-products section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="title text-center">
              <h2>Sản phẩm nổi bật</h2>
              <p>Sản phẩm nhận được nhiều sự quan tâm nhất</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            v-for="item in ProductHot"
            :key="item.productID"
            class="col-lg-3 col-6"
          >
            <div class="product">
              <div class="product-wrap">
                <RouterLink
                  @click="handleChangQuery(item.productID)"
                  :to="`/productDetails?productID=${item.productID}`"
                  ><img
                    class="img-fluid w-100 mb-3 img-first"
                    :src="environment.IMAGE_API + item.avatar"
                    alt="product-img"
                /></RouterLink>
              </div>
              <div class="product-hover-overlay">
                <a @click="Base.addToCart(item.productID)"
                  ><i class="tf-ion-android-cart"></i
                ></a>
              </div>

              <div class="product-info">
                <h2 class="product-title h5 mb-0">
                  <RouterLink
                    @click="handleChangQuery(item.productID)"
                    :to="`/productDetails?productID=${item.productID}`"
                    >{{ item.productName }}</RouterLink
                  >
                </h2>
                <span class="price"> {{ Base.Comma(item.price) }} đ </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Grid, Product } from "@/core/public_api";
import ProductApi from "@/api/module/product";
import { environment } from "@/environments/environment.prod";

const api: ProductApi = new ProductApi();
const router = useRouter();
const Base: Grid = reactive(new Grid(api));
const ProductHot = ref<Product[]>([]);
const product = ref<Product>(new Product());
onBeforeMount(() => {
  window.scrollTo({
    top: 0,
  });
  Base.apiService.callApi(
    api.getRecordApi,
    {
      recordId: router.currentRoute.value.query.productID,
      stateForm: "userGet",
    },
    (res: any) => {
      product.value = res;
    }
  );
  Base.apiService.callApi(api.getProductHot, null, (res: any) => {
    ProductHot.value = res;
    if (ProductHot.value.length > 4) {
      ProductHot.value.length = 4;
    }
  });
});
function handleChangQuery(productID: string) {
  window.scrollTo({
    top: 0,
  });
  Base.apiService.callApi(
    api.getRecordApi,
    { recordId: productID, stateForm: "userGet" },
    (res: any) => {
      product.value = res;
    }
  );
}
</script>

<style scoped></style>
