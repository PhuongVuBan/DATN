<template>
  <div class="sidebar" :class="{ small: !showSidebar }">
    <div class="logo-sidebar">
      <a v-if="showSidebar" class="logo-sidebar_home"></a>
      <a v-if="showSidebar" class="logo-sidebar_menu">
        <img
          v-if="lang === SystemConstants.get(EntitySystem.Vi)"
          src="../assets/css/image/VNPFASHION.svg"
          alt=""
        />
        <img
          v-if="lang === SystemConstants.get(EntitySystem.En)"
          src="../assets/css/image/VNPFASION.svg"
          alt=""
        />
      </a>
      <div
        v-if="!showSidebar"
        @click="handleToggleSidebar"
        class="logo-sidebar_active"
      ></div>
    </div>
    <div class="menu-sidebar">
      <router-link to="/" class="menu-sidebar_item dashboard-page">
        <div
          style="background-position: -30px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">
          {{ $t("page.dashboard") }}
        </div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t("page.dashboard") }}
        </div>
      </router-link>
      <router-link to="/cash" class="menu-sidebar_item nhanvien-page">
        <div
          style="background-position: -73px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">
          {{ $t("page.cash_main") }}
        </div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t("page.cash_main") }}
        </div>
      </router-link>
      <router-link to="/inventory" class="menu-sidebar_item warehouse-page">
        <div
          style="background-position: -291px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">
          {{ $t("page.inventory_main") }}
        </div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t("page.inventory_main") }}
        </div>
      </router-link>
      <router-link to="/category" class="menu-sidebar_item">
        <div
          style="background-position: -117px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">
          {{ $t("page.deposits") }}
        </div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t("page.deposits") }}
        </div>
      </router-link>
      <router-link to="/origin" class="menu-sidebar_item">
        <div
          style="background-position: -161px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">
          {{ $t("page.purchase") }}
        </div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t("page.purchase") }}
        </div>
      </router-link>
      <router-link to="/trademark" class="menu-sidebar_item">
        <div
          style="background-position: -204px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">
          {{ $t("page.sell") }}
        </div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t("page.sell") }}
        </div>
      </router-link>
      <router-link to="/order" class="menu-sidebar_item nhanvien-page">
        <div
          style="background-position: -73px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">
          {{ $t("page.manage_invoices") }}
        </div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t("page.manage_invoices") }}
        </div>
      </router-link>
      <router-link to="/coupon" class="menu-sidebar_item">
        <div
          style="background-position: -117px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">
          {{ $t("page.coupon") }}
        </div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t("page.coupon") }}
        </div>
      </router-link>
      <!-- <a class="menu-sidebar_item nhanvien-page">
        <div
          style="background-position: -73px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">{{ $t('page.tools') }}</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t('page.tools') }}
        </div>
      </a>
      <a class="menu-sidebar_item">
        <div
          style="background-position: -117px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">{{ $t('page.fixed_assets') }}</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t('page.fixed_assets') }}
        </div>
      </a>
      <a class="menu-sidebar_item">
        <div
          style="background-position: -161px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">{{ $t('page.salary') }}</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t('page.salary') }}
        </div>
      </a>
      <a class="menu-sidebar_item">
        <div
          style="background-position: -204px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">{{ $t('page.tax') }}</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t('page.tax') }}
        </div>
      </a>
      <a class="menu-sidebar_item dashboard-page">
        <div
          style="background-position: -30px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">{{ $t('page.price') }}</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          {{ $t('page.price') }}
        </div>
      </a> -->
    </div>
    <the-change-language></the-change-language>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { TheChangeLanguage } from "@/core/public_component";
import {
  SystemConstants,
  EntitySystem,
  StorageService,
} from "@/core/public_api";
import i18n from "@/locales/i18n";

/** Lấy ra ngôn ngữ đang sử dụng */
const lang = computed(() => i18n.global.locale.value);

/**
 * Biến store vuex
 * HAN - 15.09.2022
 */
const store: any = useStore();

/**
 * Lấy ra trạng thái show sidebar
 * HAN - 15.09.2022
 */
const showSidebar: any = computed(() => store.state.config.showSidebar);

/**
 * Hàm sử lý sự kiện toggle sidebar
 * HAN - 15.09.2022
 */
async function handleToggleSidebar() {
  await store.dispatch("config/setToggleShowSidebarAction");
  StorageService.setItemWithSystemConstants(
    EntitySystem.isShowSidebar,
    showSidebar.value
  );
}
</script>

<style scoped>
/* chia sidebar 
----------------------------
*/
.sidebar {
  position: relative;
  width: auto;
  background-color: var(--menu__color);
  height: 100vh;
  top: 0;
  left: 0;
}

/* Phần logo sidebar */
.logo-sidebar {
  display: flex;
  align-items: center;
  padding: 10px 18px;
  height: var(--height__header);
  justify-content: center;
}
.logo-sidebar_home {
  width: 24px;
  height: 24px;
  margin-right: 12px;
  background: var(--url__icon) no-repeat -424px -86px;
}
.logo-sidebar_menu {
  margin-right: 6px;
}
.logo-sidebar_menu img {
  height: 32px;
  vertical-align: middle;
  max-width: 104px !important;
  transform: scale(1.15);
  max-height: 36px;
}
.logo-sidebar_active {
  background: var(--url__icon) no-repeat;
  background-position: -316px -37px;
  width: 16px;
  height: 14px;
  cursor: pointer;
}

/* Phần menu */
.menu-sidebar {
  padding-top: 14px;
}
.menu-sidebar_item {
  position: relative;
  display: flex;
  align-items: center;
  color: var(--while__color);
  height: 42px;
  padding: 0 12px;
}
.menu-sidebar_item:hover .menu-sidebar_item-info {
  opacity: 1;
  visibility: visible;
}
.menu-sidebar_item-info {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  background-color: #585858;
  height: 40px;
  padding: 11px 16px;
  border-radius: 4px;
  white-space: nowrap;
  left: 60px;
  top: 2;
  z-index: 10;
}
.menu-sidebar_item-info::before {
  position: absolute;
  content: "";
  width: 0px;
  height: 0px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #585858; /* Tam giác phía dưới được đổ màu */
  transform: rotate(-90deg);
  top: 50%;
  margin-top: -4px;
  left: -8px;
}
.menu-sidebar_item.active {
  background-color: var(--menu__color-active);
}
.menu-sidebar_item:hover {
  background-color: var(--menu__color-active);
}
.menu-sidebar_item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
}
.menu-sidebar_item.active::before {
  background-color: var(--primary__color);
}
.menu-sidebar_icon {
  background: var(--url__icon) no-repeat;
  width: 24px;
  height: 24px;
}
.menu-sidebar_text {
  line-height: 42px;
  margin-left: 8px;
}
/* Khi được active thì sẽ dùng icon khác màu trắng */
.nhanvien-page.active .menu-sidebar_icon {
  background-position: -73px -1585px !important;
}
.dashboard-page.active .menu-sidebar_icon {
  background-position: -30px -1585px !important;
}
.warehouse-page.active .menu-sidebar_icon {
  background-position: -291px -1585px !important;
}
.menu-sidebar_item.active .menu-sidebar_text {
  font-family: "notosans-bold";
}
</style>
