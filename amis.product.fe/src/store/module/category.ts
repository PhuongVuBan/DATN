import { ActionTable, InfoTable, ModuleName } from '@/core/public_api';
import BaseStore from '../base_store';
import { category } from './column-module/index'

/**
 * Các mutation
 * HAN - 08.03.2023
 */
let mutations: any = {
  
};

/**
 * Các action
 * HAN - 08.03.2023
 */
let actions: any = {
	
};

/**
 * Các action thao tác với table
 * HAN - 08.03.2023
 */
const actionTable: InfoTable = {
  actionDefault: ActionTable.Edit,
	actionList: [ActionTable.Replication, ActionTable.Delete, ActionTable.StopUsing],
	fieldId: "categoryID",
	fieldCode: "categoryCode",
	fieldActive: "isActive",
};

/**
 * Khai báo store với việc khởi tạo store viết base với các action, mutation được xây dựng trước đó
 * HAN - 08.03.2023
 */
const categorys: BaseStore = new BaseStore(ModuleName.Category, category, mutations, actions, actionTable);

/**
 * Giải phóng bộ nhớ
 */
setTimeout(() => {
  mutations = null;
  actions = null;
}, 0);

export default categorys.store;
