<template>
  <div class="header">
    <div class="content-header_info">
      <div
        @click="handleToggleSidebar"
        v-if="showSidebar"
        class="header-icon_left"
      ></div>
      <div class="header-text">
        VNP__FASHION
      </div>
    </div>
    <div class="content-header_info">
      <button class="header-bell_setting">
        <ul>
          <li @click="handleToggleSettingLineClamp()">
            {{ $t("ui.setting_display") }}
          </li>
        </ul>
      </button>
      <button class="header-user">
        <div class="header-user_avatar"></div>
        <div class="header-user_name">{{ user.employeeName }}</div>
        <div class="header-user_icon"></div>
        <ul style="width: 150px">
          <li @click="handleToggleChangePassword()">
            {{ $t("login.change_password") }}
          </li>
          <li @click="Logout()">
            {{ $t("login.logout") }}
          </li>
        </ul>
      </button>
    </div>
    <teleport to="#app">
      <base-modal-form v-if="isShowSettingLineClamp">
        <the-setting-clamp
          :close="handleToggleSettingLineClamp"
        ></the-setting-clamp>
      </base-modal-form>
      <base-modal-form v-if="isShowFormChangePassword">
        <the-change-password
          :close="handleToggleChangePassword"
        ></the-change-password>
      </base-modal-form>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { TheSettingClamp, TheChangePassword } from "@/core/public_component";
import { Employee, EntitySystem, StorageService } from "@/core/public_api";

/**
 * Biến store vuex
 * HAN - 15.09.2022
 */
const store: any = useStore();

const user = ref<Employee>(
  JSON.parse(
    StorageService.getItemWithSystemConstants(EntitySystem.CurrentUser)
  )
);
onBeforeMount(() => {
  if (!user.value) {
    user.value = new Employee();
    window.location.href = "/login";
  }
});

/**
 * Lấy ra trạng thái show sidebar
 * HAN - 15.09.2022
 */
const isShowSettingLineClamp: any = ref(false);
const isShowFormChangePassword: any = ref(false);

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

async function Logout() {
  await StorageService.removeItemWithSystemConstants(EntitySystem.CurrentUser);
  window.location.href = "/login";
}

/**
 * Hàm sử lý show hoặc đóng setting table
 * HAN - 15.09.2022
 */
function handleToggleSettingLineClamp() {
  isShowSettingLineClamp.value = !isShowSettingLineClamp.value;
}
function handleToggleChangePassword() {
  isShowFormChangePassword.value = !isShowFormChangePassword.value;
}
</script>

<style scoped>
/* phần header công ty */
.header {
  height: var(--height__header);
  min-height: var(--height__header);
  background-color: var(--while__color);
  padding: 10px 24px;
  display: flex;
  justify-content: space-between;
  font-family: "notosans-semibold";
}
.content-header_info {
  display: flex;
  align-items: center;
  height: 100%;
}
.header-icon_left {
  width: 16px;
  height: 14px;
  background: var(--url__icon) no-repeat -847px -35px;
  cursor: pointer;
  margin-right: 24px;
}
.header-text {
  text-transform: uppercase;
  font-size: 14px;
}
.header-icon_right {
  background: var(--url__icon) no-repeat -84px -361px;
  width: 8px;
  height: 14px;
  transform: rotate(90deg);
  cursor: pointer;
  margin-left: 14px;
}
/* Phần header người dùng */
/* Phần header thông báo */
.header-bell_notification {
  background: var(--url__icon) no-repeat -788px -30px;
  width: 24px;
  height: 24px;
  margin-right: 24px;
  cursor: pointer;
}
/* header thao tác người dùng */
.header-user_avatar {
  background: var(--url__icon) no-repeat -352px -894px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.header-user {
  display: flex;
  align-items: center;
  outline: none;
  z-index: 10;
  border: none;
  position: relative;
  background-color: var(--while__color);
  cursor: pointer;
}
.header-user_name {
  margin-left: 5px;
  font-family: "notosans-semibold";
}
.header-user_icon {
  background: var(--url__icon) no-repeat -1078px -38px;
  width: 9px;
  height: 6px;
  cursor: pointer;
  margin-left: 6px;
}
.header-bell_setting {
  position: relative;
  background: var(--url__icon) no-repeat;
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 24px;
  background-position: -675px -30px;
  outline: none;
  border: none;
}
.header-bell_setting ul,
.header-user ul {
  background-color: var(--while__color);
  width: 200px;
  z-index: 1;
  position: absolute;
  right: 0;
  top: 50px;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.25);
  transition: all ease-in-out 0.15s;
  padding: 3px 0;
  color: var(--text__color);
  font-family: "notosans-regular";
  border-radius: 2px;
  border: solid 1px var(--border__input);
  opacity: 0;
  visibility: hidden;
}
.header-bell_setting ul li,
.header-user ul li {
  list-style: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  text-align: left;
  padding: 5px 10px;
  cursor: pointer;
  transition: all ease 0.15s;
  color: inherit;
}
.header-bell_setting ul li:hover,
.header-user ul li:hover {
  background-color: #f5f5f5;
  color: var(--primary__color);
}
.header-bell_setting:focus ul,
.header-user:focus ul {
  opacity: 1;
  visibility: visible;
  top: 38px;
}
</style>
