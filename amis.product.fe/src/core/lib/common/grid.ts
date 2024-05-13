import { Utils } from './utils';
import { computed } from "vue";
import { environment } from '@/environments/environment.prod';
import { ENotificationType, ApiService, InfoTable, StorageService, EntitySystem, IdbDataTable, ActionTable, Header, ServiceResponse, StatusOrder } from '@/core/public_api';
import i18n from '@/locales/i18n';
import type BaseApi from '@/api/base_api';

/** 
 * Chứa toàn bộ các base thêm sửa xoá được xây dựng
 * HAN - 08.03.2023
 */
export class Grid extends Utils{
  /** Api được truyền vào từ lớp khởi tạo */
  public api: BaseApi;

  /** Key word tìm kiếm mặc định */
  public keyword:string = '';

  constructor(module: string, api: BaseApi){
    super(module);
    this.api = api;
  }
  
  /** Hàm gọi api */
  public apiService = new ApiService();

  /** Lấy danh sách các chức năng */
  public actionTable: InfoTable = this.store.state[`${this.Module}`].actionTable;

  /** Danh sách Data bản ghi */
  public recordList:any = computed(() => this.store.state[`${this.Module}`].recordList);

  /** Danh sách các column */
  public columns:any = computed<Header []>(() => this.store.state[`${this.Module}`].columns.filter(function (value: any) { return value.IsShow; }));

  /** Lấy danh sách ng dùng được check để thực hiện chức năng như xoá hàng loạt */
  public checkShowActionSeries: any = computed(() => this.store.state[`${this.Module}`].recordCheck);

  /** Lấy ra tổng số lượng bản ghi */
  public totalCount:any = computed(() => this.store.state[`${this.Module}`].totalCount);

  /** Lấy danh sách columns hiển thị cài đặt */
  public columnSetting:any = computed(() => this.store.state[`${this.Module}`].columns);

  /** Lấy ra các cột được cố định */
  public columnFix = computed(() => {
    return this.columns.value.map((item: Header, index: number) => {
      if(item.FixColumn){
        let width = 16;
        if(this.OptionCheck.value === true){
          width = width + 40;
        }
        for(let number = 0; number < index ; number++){
          width += Number(this.columns.value[number].Width);
        }
        return {
          Width: width,
        };
      }
    })
  });

  /**
   * Các Method
   */

  /** Hàm load dữ liệu lên table 
   * HAN - 08.03.2023
   * */
  public loadData = async (filter: any = undefined) => {
    try{
      if(filter && filter.resetPage){
        this.recordSelectPaging.value = 0;
        filter.v_Offset = this.recordSelectPaging.value;
      }
      if (filter) {
        if(filter !== true){
          await this.store.dispatch(`${this.Module}/setFilterAction`, filter);
        }
      }
      this.isShowLoaderTable.value = true;
      const columnSelect = this.columns.value.reduce((acc: any, cur: any) => {
        if(cur.IsShow){
          return [...acc, cur.FieldSelect];
        }
      },[])
      await this.apiService.callApi(this.api.getRecordList, { v_Select: columnSelect, ...this.store.state[`${this.Module}`].filter }, (response: any) => { 
        if(!this.tree){
          this.store.dispatch(`${this.Module}/getRecordListAction`, response);
        }
        else{
          this.store.dispatch(`${this.Module}/getRecordListAction`, { recordList: this.listToTree(response.recordList, this.tree), totalCount: response.totalCount });
        }
      });
      this.isShowLoaderTable.value = false;
    }
    catch(e){
      console.log(e);
    }
  }

  /** Hàm xử lý checkbox value true thì là check ô tất cả check, value là 0,1,2 là xử lý các phần tử được check
   * HAN - 08.03.2023 */
  public handleClickCheckbox = (value: any, listID: any) => {
    try {
      if (value === true) {
        this.store.dispatch(`${this.Module}/setAllCheckboxRecordAction`, listID);
      } else {
        this.store.dispatch(`${this.Module}/setCheckboxRecordAction`, value);
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
  * hàm lưu số lượng bản ghi muốn hiển thị vào local
  * HAN - 08.03.2023
  */
  public setPageSize = async (record: number) => {
    StorageService.setItemWithSystemConstants(EntitySystem.PageSize, record)
    this.PageSize = record;
    this.recordSelectPaging.value = 0;
    this.loadData({ v_Offset: 0, v_Limit: record, v_Where: this.keyword});
  }

  /** Hàm xử lý search tự động và debounce 600ms 
   * HAN - 08.03.2023*/
  public handleSearchData = async (event: any) =>{
    this.handleDebounce(600, async (event: any) => {
      this.keyword = event.target.value;
      this.recordSelectPaging.value = 0;
      this.loadData({ v_Offset: 0, v_Limit: this.PageSize, v_Where: this.keyword, });
    }, event);
  }

  /** Hàm xử lý chuyển trang 
   * HAN - 08.03.2023*/
  public selectPaging = async (value: any) => {
    this.recordSelectPaging.value = value;
    this.loadData({ v_Offset: value, v_Limit: this.PageSize, v_Where: this.keyword, });
  }

  /**
   * Hàm xử lý đóng mở setting table
   * HAN - 08.03.2023
   */
  public handleShowSettingTable = async (columnCustom: any = undefined) => {
    if(columnCustom){
      const dataTable: IdbDataTable = new IdbDataTable(this.Module);
      dataTable.set(JSON.parse(JSON.stringify(columnCustom)));
      await this.store.dispatch(`${this.Module}/setColumnAction`, columnCustom);
      this.loadData();
    }
    this.isShowSettingTable.value = !this.isShowSettingTable.value;
  }

  /**
   * Hàm fix column trên thanh header
   * HAN - 08.03.2023
   */
  public handleFixColumn = (name: string) => {
    const columns: Header [] = JSON.parse(JSON.stringify(this.columnSetting.value));
    this.columnSetting.value.forEach(async (item: Header, index: number) => {
      if(item.FieldSelect === name){
        columns[index].FixColumn = !columns[index].FixColumn;
        await columns.sort((a: Header, b: Header) => (a.FixColumn === b.FixColumn) ? 0 : a.FixColumn ? -1 : 1);
        const dataTable: IdbDataTable = new IdbDataTable(this.Module);
        dataTable.set(JSON.parse(JSON.stringify(columns)));
        this.store.dispatch(`${this.Module}/setColumnAction`, columns);
      }
    })
  }

  /**
   * Hàm fix column khi người dùng kéo những column bị fix
   * HAN - 08.03.2023
   */
  public setupColumns = async () => {
    const columns: Header [] = JSON.parse(JSON.stringify(this.columns.value));
    await columns.sort((a: Header, b: Header) => (a.FixColumn === b.FixColumn) ? 0 : a.FixColumn ? -1 : 1);
    this.store.dispatch(`${this.Module}/setColumnAction`, columns);
  }

  /**
   * Hàm xử lý xoá 1 bản ghi đã chọn
   * HAN - 08.03.2023
   */
  public deleteRecord = (id: any) => {
    this.apiService.callApi(this.api.deleteRecordApi, id, async () => { 
      await this.addNotification(ENotificationType.Success, i18n.global.t('message.crud.delete_success'));
      await this.store.dispatch(`${this.Module}/setCheckboxUnCheckRecordAction`, id);
      if(this.recordList.value.length === 0){
        this.recordSelectPaging.value = 0;
        this.loadData({ v_Offset: 0, v_Limit: this.PageSize, v_Where: this.keyword });
      }
    }, false, (res: ServiceResponse) => {
      this.showNotificationError(i18n.global.t(res.data.userMsg));
    });
  }
  
  /**
   * Hàm xử lý xoá toàn bộ danh sách đã chọn
   * HAN - 08.03.2023
   */
  public deleteAll = () => {
    const count = this.checkShowActionSeries.value.length;
    this.apiService.callApi(this.api.deleteMultipleApi, this.checkShowActionSeries.value, async () => { 
      await this.store.dispatch(`${this.Module}/setEmptyCheckBoxRecordAction`);
      await this.addNotification(ENotificationType.Success, i18n.global.t('message.crud.delete_success_all', { count: count }));
      if(this.recordList.value.length === 0){
        this.recordSelectPaging.value = 0; 
        this.loadData({ v_Offset: 0, v_Limit: this.PageSize, v_Where: this.keyword });
      }
    }, false );
  }

  /**
   * Hàm thực hiện call api toggle active record
   * HAN - 08.03.2023
   */
  public toggleRecordActiveApi = (recordId: any) => {
    this.apiService.callApi(this.api.toggleActiveApi, recordId, () => { 
      this.store.dispatch(`${this.Module}/setToggleActiveAction`, recordId);
    });
  }

  /** 
   * Hàm mở form thêm, sửa 
   * HAN - 08.03.2023
   * */
  public openModal = async (stateForm: any = ActionTable.Add, recordId: any = undefined) => {
    this.setStateForm(stateForm);
    if(recordId){
      try {
        await this.apiService.callApi(this.api.getRecordApi, {recordId: recordId, stateForm: stateForm}, (response: any) => { 
          if(stateForm === ActionTable.Edit || stateForm === ActionTable.Replication){
            this.RecordCode = null;
          }
          this.RecordEdit = response;
          this.isShowModal.value = true;
        },false );
      } catch (e) {
        console.log(e);
      }
    }
    else if(stateForm === ActionTable.Add){
      this.RecordEdit = null;
      this.isShowModal.value = true;
    }
  }

  /**
   * Hàm đóng form thêm, sửa 
   * HAN - 08.03.2023
   */
  public closeModal = () => {
    this.isShowModal.value = false;
  }

  /**
   * Hàm set trạng thái form (Sửa, thêm, nhân bản, ...)
   * HAN - 08.03.2023
   */
  public setStateForm = (state: string) => {
    this.StateForm.value = state;
  }

  /** 
   * Hàm export excel theo điều kiện 
   * HAN - 08.03.2023
   * */
  public exportToExcel = () => {
    try{
      const columnSelect = this.columns.value.reduce((acc: any, cur: any) => {
        if(cur.IsShow){
          return [...acc, cur.FieldSelect];
        }
      },[])
      this.apiService.callApi(this.api.getExportExcel, { v_Select: columnSelect, ...this.store.state[`${this.Module}`].filter, v_Offset: 0, v_Limit: 0 }, (response: any) => { 
        this.downloadFromUrl(environment.IMAGE_API + response);
      }, false);
    }
    catch(e){
      console.log(e);
    }
  }

  /** 
   * Hàm nhập chọn file excel
   * HAN 08.03.2023
   */
  public choseExcel = (event: any) => {
    let file = null;
    if (event.type === 'change' && event.target.files && event.target.files.length > 0) {
      file = event.target.files[0];
    }
    else if(event){
      file = event;
    }
    if(file){
      if(file.size <= this.fileSizeMax.value){
        this.fileExcel.value = file;
        this.fileNameExcel.value = file.name;
        this.fileSize.value = this.calcFile(file.size);
        return;
      }
      else if (file.size > this.fileSizeMax.value){
        this.addNotification(ENotificationType.Error, i18n.global.t('common.chose_file_correct_size',{value: this.calcFile(this.fileSizeMax.value) }));
      }
    }
  }

  /**
   * Hàm xử lý uploadExcel
   * HAN 08.03.2023
   */
  public uploadExcel = () => {
    if (this.fileExcel.value) {
      this.apiService.callApi(this.api.uploadExcel, this.fileExcel.value, (res: any) => { 
        if(res){
          this.setResultExcel(res);
          this.showResultExcel();
        }
        this.removeFileExcel();
        this.closeDialog();
        this.addNotification(ENotificationType.Success, i18n.global.t('message.api.import_success'));
        this.recordSelectPaging.value = 0; 
        this.loadData({ v_Offset: 0, v_Limit: this.PageSize, v_Where: this.keyword });
      }, false);
    } 
    else {
      this.addNotification(ENotificationType.Wanning, i18n.global.t('common.chose_file'));
    }
  }

  /**
   * Set trống danh sách
   * HAN 08.03.2023
   */
  public setEmptyData(){
    this.store.dispatch(`${this.Module}/getRecordListAction`, {
      recordList: [],
      totalCount: 0,
    });
  }

  /**
   * Hàm xử lý show thông báo khi có lỗi xảy ra thêm sửa xoá
   * HAN - 08.03.2023
   */
  public addNotificationCRUD = (message: any, module: string = 'common') => {
    this.addNotification(ENotificationType.Error, this.formatServiceResponse(message, module));
  }

  /**
   * Hàm xử lý format dữ liệu trả về từ backend
   * HAN - 08.03.2023
   */
  public formatServiceResponse = (message: any, module: string = 'common') => {
    const label = 0; // Tách message ra thành mảng lấy phần tử thứ 0
    const field = 1; // Tách message ra thành mảng lấy phần tử thứ 1
    const value = 2; // Tách message ra thành mảng lấy phần tử thứ 2
    const messAndField = 2; // Tách được 2 giá trị hiển thị theo kiểu 2 giá trị
    const messAndFieldAndValue = 3; // Tách được 3 giá trị hiển thị theo kiểu 3 giá trị
    if(message && message != ''){
      const data = message.split(' MESSAGE.VALID.SPLIT ');
      if(data.length === messAndField){
        const messField = !(i18n.global.t(`${module}.${this.lowercaseFirstLetter(data[field])}`) === `${module}.${this.lowercaseFirstLetter(data[field])}`) ?
         `${module}.${this.lowercaseFirstLetter(data[field])}` : `common.${this.lowercaseFirstLetter(data[field])}`
        return i18n.global.t(data[label], {field: i18n.global.t(messField)});
      }
      else if(data.length === messAndFieldAndValue){
        const messField = !(i18n.global.t(`${module}.${this.lowercaseFirstLetter(data[field])}`) === `${module}.${this.lowercaseFirstLetter(data[field])}`) ?
         `${module}.${this.lowercaseFirstLetter(data[field])}` : `common.${this.lowercaseFirstLetter(data[field])}`
        return i18n.global.t(data[label], {field: i18n.global.t(messField), value: data[value]});
      }
      else{
        return i18n.global.t(message);
      }
    }
    else{
      return ''
    }
  }

  public formatStatus = (status: StatusOrder) => {
    return status === StatusOrder.WaitConfirm ? i18n.global.t('module.order.WaitConfirm') :
    status === StatusOrder.Confirm ? i18n.global.t('module.order.Confirm') :
    status === StatusOrder.Delivery ? i18n.global.t('module.order.Delivery') :
    status === StatusOrder.Delivered ? i18n.global.t('module.order.Delivered') :
    status === StatusOrder.Destroy ? i18n.global.t('module.order.Destroy') : ""
  }
}