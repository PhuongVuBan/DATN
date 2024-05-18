<template>
  <div class="container-table" @click="showOrderStatusFilterList = false">
    <div class="container-table_header">
      <div class="name-table">
        <h1>{{ $t("page.order") }}</h1>
      </div>
    </div>
    <div class="table-function sticky">
      <div class="form-fix">
        <div class="mi-arrow-check-all"></div>
        <button class="table-function_series toggle-list">
          <span>{{ $t("common.batch_execution") }}</span>
          <div class="table-function_series-icon"></div>
          <div
            v-show="Base.checkShowActionSeries.length > 0"
            class="table-list_action"
          >
            <div
              class="list_action-item"
              @click="handleChangeStatus('waitConfirm')"
            >
              {{ $t("common.waitConfirm") }}
            </div>
            <div
              class="list_action-item"
              @click="handleChangeStatus('confirm')"
            >
              {{ $t("common.confirm") }}
            </div>
            <div
              class="list_action-item"
              @click="handleChangeStatus('deliveryOrder')"
            >
              {{ $t("common.deliveryOrder") }}
            </div>
            <div
              class="list_action-item"
              @click="handleChangeStatus('delivered')"
            >
              {{ $t("common.delivered") }}
            </div>
            <div
              class="list_action-item"
              @click="handleChangeStatus('destroy')"
            >
              {{ $t("common.destroy") }}
            </div>
            <div class="list_action-item" @click="handleQuestionDeleteAll()">
              {{ $t("common.delete") }}
            </div>
          </div>
        </button>
        <base-form-key-search
          :loadData="Base.loadData"
          :moduleFilter="ModuleName.Cart"
        ></base-form-key-search>
        <div class="status-filter-form">
          <span class="status-filter-form-header table-function_series" @click.stop="showOrderStatusFilterList = !showOrderStatusFilterList">
            Lọc theo trạng thái đơn hàng
            <div class="table-function_series-icon"></div>
          </span>
          <ul class="status-filter-list" v-if="showOrderStatusFilterList">
            <li class="status-filter-item" v-for="item in orderStatusSource" @click.stop="searchByOrderStatus(item.key)">
              <div class="check">
                <input
                  class="checkbox"
                  type="checkbox"
                  :id="'ostt-item-' + item.key"
                  :checked="orderStatusList.includes(item.key)"
                />
                <slot></slot>
                <div
                    class="label-checkbox"
                ></div>
              </div>
              {{item.value}}
            </li>
          </ul>
        </div>
      </div>
      <div style="min-width: 350px" class="table-function_search">
        <div class="search-table">
          <input
            @input="Base.handleSearchData"
            class="input input-table_search"
            type="text"
            :placeholder="$t('common.search_by_code_name')"
          />
          <div class="icon-search"></div>
        </div>
        <div
          @click="Base.loadData()"
          class="action-render_table reload-table"
          :content="$t('common.load_data')"
        ></div>
        <div
          @click="Base.exportToExcel()"
          class="action-render_table export-data"
          :content="$t('common.export_excel')"
        ></div>
        <div
          @click="Base.handleShowSettingTable()"
          class="action-render_table setting-table"
          :content="$t('common.customize_interface')"
        ></div>
      </div>
    </div>
    <base-table
      :BaseComponent="Base"
      :handleClickActionColumTable="handleClickActionColumTable"
    >
    </base-table>
    <teleport to="#app">
      <base-modal-form v-if="Base.isShowResultExcel">
        <view-order :Base="Base"></view-order>
      </base-modal-form>
      <base-setting
        v-if="Base.isShowSettingTable"
        :columns="Base.columnSetting"
        :handleShowSettingTable="Base.handleShowSettingTable"
      ></base-setting>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import {Order} from '../../../core/lib/grid_instance/order';
import {
  Grid,
  ModuleName,
  ActionTable,
  ENotificationType,
} from "@/core/public_api";
import {
  ref,
  reactive,
  onBeforeMount,
  onUnmounted,
  onMounted,
  defineAsyncComponent,
} from "vue";
import { useI18n } from "vue-i18n";
import CartApi from "@/api/module/cart";
const ViewOrder = defineAsyncComponent(() => import("./ViewOrder.vue"));

const { t } = useI18n();
/**
 * Khai báo các api của module
 * HAN 13-03-2023
 */
const api: CartApi = new CartApi();

/** Sử dụng base thư viện Grid đã viết */
const Base: Order = reactive(new Order(ModuleName.Cart, api));

/** Sử dụng base thư viện Grid đã viết */
const orderStatusList : any = reactive([]);

const showOrderStatusFilterList = ref(false);

/** Sử dụng base thư viện Grid đã viết */
const orderStatusSource = [
  {key: 0, value: 'Chờ xác nhận'},
  {key: 1, value: 'Xác nhận'},
  {key: 2, value: 'Đang giao hàng'},
  {key: 3, value: 'Đã giao hàng'},
  {key: 4, value: 'Đơn bị huỷ'},
];

/**
 * Trước khi mounted sẽ load dữ liệu 1 lần
 * HAN - 08.03.2023
 */
onBeforeMount(() => {
  Base.loadData({
    v_Offset: Base.recordSelectPaging,
    v_Limit: Base.PageSize,
    v_Where: Base.keyword,
    v_OrderStatus: orderStatusList.length ? orderStatusList.join(",") : "",
  });
});

function searchByOrderStatus(selectedValue: any) {
  let searchIdx = orderStatusList.indexOf(selectedValue);
  if(searchIdx == -1) {
    orderStatusList.push(selectedValue);
  }
  else {
    orderStatusList.splice(searchIdx, 1);
  }
  Base.loadData({
    v_Offset: Base.recordSelectPaging,
    v_Limit: Base.PageSize,
    v_Where: Base.keyword,
    v_OrderStatus: orderStatusList.length ? orderStatusList.join(",") : "",
  });
}

/**
 * Hàm xử lý khi click vào các hành động của từng cột dữ liệu table
 * HAN - 08.03.2023
 */
function handleClickActionColumTable(
  action: any,
  recordId: any,
  recordCode: any
) {
  try {
    if (action == ActionTable.Delete) {
      questionDeleteRecordApi(recordId, recordCode);
    } else if (action == ActionTable.ViewDetail) {
      Base.RecordID = recordId;
      Base.showResultExcel();
    } else if (action === ActionTable.WaitConfirm) {
      exActionAll(action, recordId);
    } else if (action === ActionTable.Confirm) {
      exActionAll(action, recordId);
    } else if (action === ActionTable.Delivery) {
      exActionAll(action, recordId);
    } else if (action === ActionTable.Delivered) {
      exActionAll(action, recordId);
    } else if (action === ActionTable.Destroy) {
      exActionAll(action, recordId);
    }
  } catch (e) {
    console.log(e);
  }
}
function handleChangeStatus(action: any) {
  Base.showNotificationWanning(
    exActionAll,
    t("message.crud.action_all"),
    action
  );
}

function exActionAll(action: any, recordId: any = undefined) {
  const listID = recordId ? [recordId] : Base.checkShowActionSeries;
  Base.apiService.callApi(
    Base.api.actionMultipleApi,
    { action: action, listID: listID },
    () => {
      Base.addNotification(
        ENotificationType.Success,
        t("message.crud.success_all")
      );
      Base.loadData();
    },
    false
  );
}

/**
 *  Hàm thực hiện hỏi xoá một bản ghi
 * HAN - 08.03.2023
 */
function questionDeleteRecordApi(recordId: any, recordCode: any) {
  Base.showNotificationWanning(
    Base.deleteRecord,
    t("message.crud.question_wanning_delete", {
      module: t(`page.${Base.Module}`),
      code: recordCode ? recordCode : t("message.crud.statue_of_liberty"),
    }),
    recordId
  );
}

/**
 * Hàm hỏi xác nhận xoá nhiều
 * HAN - 08.03.2023
 */
function handleQuestionDeleteAll() {
  try {
    if (Base.checkShowActionSeries.length > 0) {
      Base.showNotificationWanning(
        Base.deleteAll,
        t("message.crud.wanning_delete_all")
      );
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 * Hàm xử lý các event nút bấm tắt
 * HAN 08.03.2023
 */
function handleKey(event: any) {
  Base.handleEventCtrlNum1(event, Base.openModal, ActionTable.Add);
}

/**
 * Khi Mounted thì bắt đầu lắng nghe các sự kiện
 * HAN - 08.03.2023
 */
onMounted(() => {
  window.addEventListener("keydown", handleKey);
  window.addEventListener("keyup", Base.handleEventInterruptCtrlNum1);
});

/**
 * Khi UnMounted thì bắt đầu huỷ lắng nghe các sự kiện
 * HAN - 08.03.2023
 */
onUnmounted(() => {
  window.removeEventListener("keyup", Base.handleEventInterruptCtrlNum1);
  window.removeEventListener("keydown", handleKey);
  Base.setEmptyData();
});
</script>

<style scoped>
@import "../../../assets/css/crud.css";
.form-fix {
  column-gap: 4px;
}

.status-filter-item {
  position: relative;
  cursor: pointer;
}

.status-filter-form-header {
  display: flex;
  cursor: pointer;
  height: 36px;
  align-items: center;
  border: 2px solid #3b3c3f;
  font-family: "notosans-semibold";
}

.status-filter-list{
  position: absolute;
  list-style-type: none;
  right: 8px;
  border: 1px solid var(--border__input);
  top: calc(100% + 1px);
  background: #fff;
  border-radius: 2px;
}

.status-filter-item {
  height: 24px;
  display: flex;
  align-items: center;
  column-gap: 2px;
  padding: 0 0 0 2px;
}

.status-filter-item:hover{
  background-color: aquamarine;
}

.check {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 13px;
}

.label-checkbox {
  width: 16px;
  height: 16px;
  align-items: center;
  background-color: var(--while__color);
  border: solid 1px var(--border__input);
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
  transition: all ease 0.15s;
  position: relative;
}

.input-focus {
  position: absolute;
  border-radius: 2px;
  left: -3px;
  top: -3px;
  width: 24px;
  height: 24px;
  display: block;
  border: solid 1px #0076c04b;
  opacity: 0;
  visibility: hidden;
}

.checkbox {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  left: 0;
  top: 0;
}

input:checked ~ .label-checkbox::before {
  opacity: 1;
  visibility: visible;
}

input:checked ~ .label-checkbox {
  border-color: var(--primary__color);
  transform: rotate(0deg);
}

.check:active .input-focus:not(.lock-checkbox) {
  opacity: 1;
  visibility: visible;
}

input {
  z-index: 10;
}

.label-checkbox::before {
  content: "";
  background: var(--url__icon) no-repeat -1225px -363px;
  width: 14px;
  height: 11px;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  display: block;
}

.input.disabled-input {
  box-shadow: none;
}
</style>
