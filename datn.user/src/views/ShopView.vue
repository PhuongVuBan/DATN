<template>
  <div className="shop-container">
    <section class="page-header">
      <div class="overly"></div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="content text-center">
              <h1 class="mb-3">Sản phẩm</h1>
              <p>
                Tìm kiếm sản phẩm của chúng tôi, thêm giỏ hàng, thanh toán mua
                hàng
              </p>

              <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent justify-content-center">
                  <li class="breadcrumb-item">
                    <router-link to="/">Trang chủ</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Sản phẩm
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="products-shop section">
      <div class="container">
        <div class="row">
          <div class="col-md-9">
            <div class="row align-items-center">
              <div class="col-lg-12 mb-4 mb-lg-0">
                <div class="section-title">
                  <h2 class="d-block text-left-sm">Sản phẩm</h2>

                  <div class="heading d-flex justify-content-between mb-5">
                    <p class="result-count mb-0">{{ totalCount }} kết quả</p>
                    <form class="ordering" method="get">
                      <h3 class="widget-title h4 mb-1">
                        Chọn danh mục sản phẩm
                      </h3>
                      <select
                        v-model="find.v_CategoryID"
                        name="orderby"
                        class="orderby form-control"
                        aria-label="Shop order"
                      >
                        <option value="" selected>Tất cả</option>
                        <option
                          :value="item.categoryID"
                          v-for="item in optionCategory"
                          :key="item.categoryID"
                        >
                          {{ item.categoryName }}
                        </option>
                      </select>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div
                v-for="item in ProductList"
                :key="item.productID"
                class="col-lg-4 col-12 col-md-6 col-sm-6 mb-5"
              >
                <div class="product">
                  <div class="product-wrap">
                    <RouterLink
                      :to="`/productDetails?productID=${item.productID}`"
                      ><img
                        class="img-fluid w-100 mb-3 img-first"
                        :src="environment.IMAGE_API + item.avatar"
                        alt="product-img"
                    /></RouterLink>
                  </div>
                  <div class="product-hover-overlay">
                    <RouterLink
                      to="/shop"
                      @click="Base.addToCart(item.productID)"
                      ><i class="tf-ion-android-cart"></i
                    ></RouterLink>
                  </div>

                  <div class="product-info">
                    <h2 class="product-title h5 mb-0">
                      <RouterLink
                        :to="`/productDetails?productID=${item.productID}`"
                        >{{ item.productName }}</RouterLink
                      >
                    </h2>
                    <span class="price"> {{ Base.Comma(item.price) }} đ </span>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <nav aria-label="Page navigation">
                  <ul class="pagination">
                    <li class="page-item">
                      <router-link
                        @click="selectPage('prev')"
                        class="page-link"
                        to="/shop"
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </router-link>
                    </li>
                    <li
                      v-for="item in pageAll"
                      :key="item"
                      class="page-item"
                      :class="[{ active: item == find.v_Page }]"
                    >
                      <router-link
                        @click="selectPage(item)"
                        class="page-link active"
                        to="/shop"
                      >
                        {{ item }}
                      </router-link>
                    </li>
                    <li class="page-item">
                      <router-link
                        @click="selectPage('next')"
                        class="page-link"
                        to="/shop"
                        aria-label="Next"
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </router-link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <form class="mb-5" style="margin-top: 46px">
              <div class="widget widget-colors mb-3">
                <h3 class="widget-title h4 mb-1">Chọn thương hiệu</h3>
                <select
                  v-model="find.v_TrademarkID"
                  name="orderby"
                  class="orderby form-control"
                  aria-label="Shop order"
                >
                  <option value="" selected>Tất cả</option>
                  <option
                    :value="item.trademarkID"
                    v-for="item in optionTrademark"
                    :key="item.trademarkID"
                  >
                    {{ item.trademarkName }}
                  </option>
                </select>
              </div>
              <div class="widget widget-colors mb-3">
                <h3 class="widget-title h4 mb-1">Chọn xuất xứ</h3>
                <select
                  v-model="find.v_OriginID"
                  name="orderby"
                  class="orderby form-control"
                  aria-label="Shop order"
                >
                  <option value="" selected>Tất cả</option>
                  <option
                    :value="item.originID"
                    v-for="item in optionOrigin"
                    :key="item.originID"
                  >
                    {{ item.originName }}
                  </option>
                </select>
              </div>
              <div class="widget widget-colors mb-3">
                <h3 class="widget-title h4 mb-1">Chọn cơ sở</h3>
                <select
                  v-model="find.v_DepotID"
                  name="orderby"
                  class="orderby form-control"
                  aria-label="Shop order"
                >
                  <option value="" selected>Tất cả</option>
                  <option
                    :value="item.depotID"
                    v-for="item in optionDepot"
                    :key="item.depotID"
                  >
                    {{ item.depotName }}
                  </option>
                </select>
              </div>
              <div class="widget widget-colors mb-3">
                <h3 class="widget-title h4 mb-1">Chọn khoảng giá</h3>
                <input
                  v-model="find.v_PriceStart"
                  class="form-control rounded mb-3"
                  placeholder="Từ khoảng"
                  type="number"
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                <input
                  v-model="find.v_PriceEnd"
                  class="form-control rounded"
                  placeholder="Đến khoảng"
                  type="number"
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
              </div>
              <button
                @click="filter"
                type="button"
                class="btn btn-black btn-small"
              >
                Tìm kiếm
              </button>
            </form>

            <section class="widget widget-popular mb-5">
              <h3 class="widget-title mb-4 h4">Sản phẩm mới nhất</h3>
              <router-link
                v-for="item in ProductHome"
                :key="item.productID"
                class="popular-products-item media"
                :to="`/productDetails?productID=${item.productID}`"
              >
                <img
                  :src="environment.IMAGE_API + item.avatar"
                  alt=""
                  class="img-fluid mr-4"
                />
                <div class="media-body">
                  <h6>{{ item.productName }}</h6>
                  <span class="price">{{ Base.Comma(item.price) }} đ</span>
                </div>
              </router-link>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Grid,
  Category,
  Product,
  Trademark,
  Depot,
  Origin,
} from "@/core/public_api";
import { reactive, onBeforeMount, ref, computed, watch } from "vue";
import DepotApi from "@/api/module/depot";
import CategoryApi from "@/api/module/category";
import TrademarkApi from "@/api/module/trademark";
import OriginApi from "@/api/module/origin";
import ProductApi from "@/api/module/product";
import { environment } from "@/environments/environment.prod";

/**
 * Khai báo các api của module
 * HAN 13-03-2023
 */
const api: ProductApi = new ProductApi();

/** Sử dụng base thư viện Grid đã viết */
const totalCount = ref(1);
const pageAll = computed(() => Math.ceil(totalCount.value / 12));
const Base: Grid = reactive(new Grid(api));
const find = ref({
  v_CategoryID: "",
  v_TrademarkID: "",
  v_OriginID: "",
  v_DepotID: "",
  v_PriceStart: "",
  v_PriceEnd: "",
  v_KeyWord: "",
  v_Page: 1,
});

/** Dữ liệu dropdown*/
const optionOrigin = ref<Origin[]>([]);
const optionTrademark = ref<Trademark[]>([]);
const optionCategory = ref<Category[]>([]);
const optionDepot = ref<Depot[]>([]);
const ProductHome = ref<Product[]>([]);
const ProductList = ref<Product[]>([]);
const keyWord = computed(() => Base.store.state.config.keyWord);

watch(keyWord, () => {
  find.value.v_KeyWord = keyWord.value;
  filter();
});

function filter() {
  find.value.v_Page = 1;
  const query = {
    ...find.value,
  };
  if (!query.v_PriceStart || query.v_PriceStart == "") {
    query.v_PriceStart = "0";
  }
  if (!query.v_PriceEnd || query.v_PriceEnd == "") {
    query.v_PriceEnd = "9000000000000";
  }
  Base.apiService.callApi(api.getRecordPage, query, (res: any) => {
    ProductList.value = res.recordList;
    totalCount.value = res.totalCount;
  });
}

function selectPage(page: any) {
  if (page == "prev") {
    if (find.value.v_Page != 1) {
      find.value.v_Page--;
    }
  } else if (page == "next") {
    if (find.value.v_Page < pageAll.value) {
      find.value.v_Page++;
    }
  } else {
    find.value.v_Page = page;
  }
  const query = {
    ...find.value,
  };
  if (!query.v_PriceStart || query.v_PriceStart == "") {
    query.v_PriceStart = "0";
  }
  if (!query.v_PriceEnd || query.v_PriceEnd == "") {
    query.v_PriceEnd = "9000000000000";
  }
  Base.apiService.callApi(api.getRecordPage, query, (res: any) => {
    ProductList.value = res.recordList;
    totalCount.value = res.totalCount;
  });
}

/**
 * Trước khi mounted sẽ load dữ liệu 1 lần
 * HAN - 08.03.2023
 */
onBeforeMount(() => {
  find.value.v_KeyWord = keyWord.value;
  Base.apiService.callApi(api.getProductHome, { v_KeyWord: "" }, (res: any) => {
    ProductHome.value = res;
  });
  filter();
  loadDropDown();
  window.scrollTo({
    top: 0,
  });
});

/**
 * Hàm load dữ liệu đổ vào dropdowns combobox
 * HAN 08.03.2023
 */
function loadDropDown() {
  Base.apiService.callApi(
    new OriginApi().getDropdown,
    null,
    async (response: any) => {
      optionOrigin.value = response;
    }
  );
  Base.apiService.callApi(
    new TrademarkApi().getDropdown,
    null,
    async (response: any) => {
      optionTrademark.value = response;
    }
  );
  Base.apiService.callApi(
    new CategoryApi().getDropdown,
    null,
    async (response: any) => {
      optionCategory.value = response;
    }
  );
  Base.apiService.callApi(
    new DepotApi().getDropdown,
    null,
    async (response: any) => {
      optionDepot.value = response;
    }
  );
}
</script>

<style scoped></style>
