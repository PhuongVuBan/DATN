import { UtilsComponents } from './utils_components';
import { EntitySystem, KeyCode, StorageService, SystemConstants } from "@/core/public_api";
import { useStore } from "vuex";
import { computed, ref } from "vue";

/**
 * Chứa các hàm base đã xây dựng
 * HAN - 08.03.2023
 */
export class Utils extends UtilsComponents{
  /** Store vuex */
  public store = useStore();

  /** Bản ghi được sửa hoặc nhân bản */
  public RecordEdit: any;

  /** Mã sinh tự động */
  public RecordCode: any;

  /** Mã sinh tự động */
  public RecordID: any;

  /** Module đang hoạt động kế thừa lớp */
  public Module: string;

  /** Số lượng bản ghi trên 1 trang */
  public PageSize: number;

  /** Có setup check column */
  public OptionCheck: any = ref(true);

  /** Biến chứa trạng thái ẩn hiện setting table */
  public isShowSettingTable:any = ref(false);

  /** Biến trạng thái ẩn hiện modal thêm sửa */
  public isShowModal:any = ref(false);

  /** Biến lưu trạng thái hiển thị form result excel */
  public isShowResultExcel:any = ref(false);

  /** trạng thái form */
  public StateForm: any = ref('');

  /** biến theo dõi số bản ghi muốn lấy chuyển trang mặc định lấy từ bản ghi số 0 */
  public recordSelectPaging:any = ref(0);

  /** Biến chứa trạng thái ẩn hiện loader table */
  public isShowLoaderTable:any = ref(false);

  /** Biến lưu trạng thái show dialog */
  public isShowDialog: any = ref(false);

  /** File excel */
  public fileExcel: any = ref(null);

  /** Name file excel */
  public fileNameExcel: any = ref<string>('');

  /** Name size excel */
  public fileSize: any = ref<number>();

  /** Name size tối đa có thể chọn, mặc định là 20mb */
  public fileSizeMax: any = ref<number>(20971520);

  /**Chia cây */
  public tree: any = undefined;

  /**Chia cây */
  public showTotalColumn: boolean = false;

  /** chế độ ẩn dòng khi xuống dòng của table */
  public lineClamp:any = computed(() => this.store.state.config.lineClamp);

  /** Kết quả nhập tệp */
  public resultExcel: any = ref({
    listFail: [],
    listPass: [],
  });

  /**
  * lưu lại giá trị các phím bấm tắt không ngắt quãng
  * HAN 08.03.2023
  */
  public EventCtrlAltA: any [] = [];

  /**
  * lưu lại giá trị các phím bấm tắt không ngắt quãng
  * HAN 08.03.2023
  */
  public EventCtrlShiftS: any [] = [];

  /**
  * lưu lại giá trị các phím bấm tắt không ngắt quãng
  * HAN 08.03.2023
  */
  public EventShiftDelete: any [] = [];

  /**
  * lưu lại giá trị các phím bấm tắt không ngắt quãng
  * HAN 08.03.2023
  */
  public EventCtrlNum1: any [] = [];

  /**
   * Hàm khởi tạo lấy ra page size
   */
  constructor(module: string = ''){
    super();
    this.Module = module;

    /** Kiểm tra xem PageSize được lưu trong local strore hay chưa, nếu chưa lưu thì tiến hành lưu lại với giá trị mặc định */
    try {
      if(!StorageService.getItemWithSystemConstants(EntitySystem.PageSize)){
        StorageService.setItemWithSystemConstants(EntitySystem.PageSize, SystemConstants.get(EntitySystem.CurrentPage))
      }
      this.PageSize = Number(StorageService.getItemWithSystemConstants(EntitySystem.PageSize));
    } catch (e) {
      console.log(e);
      StorageService.setItemWithSystemConstants(EntitySystem.PageSize, SystemConstants.get(EntitySystem.CurrentPage))
      this.PageSize = Number(StorageService.getItemWithSystemConstants(EntitySystem.PageSize));
    }
  }

  /**
  * Hàm xử lý các event nút bấm tắt Ctrl Alt A
  * HAN 08.03.2023
  */
  public handleEventCtrlAltA = (event: any, handle: Function, dataHandle: any) => {
    if ( event.keyCode === KeyCode.Ctrl || event.keyCode === KeyCode.Alt || event.keyCode === KeyCode.A ) {
      if (!this.EventCtrlAltA.includes(event.keyCode)) {
        this.EventCtrlAltA.push(event.keyCode);
        if (this.EventCtrlAltA.length === 3) {
          event.preventDefault(); 
          // Khi bấm đủ 3 phím sẽ kích hoạt hành động nhấn
          this.EventCtrlAltA.length = 0;
          handle(dataHandle);
        }
      }
    }
  }

  /**
  * Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện Ctrl Alt A
  * HAN 08.03.2023
  */
  public handleEventInterruptCtrlAltA = (event: any) => {
    if ( event.keyCode === KeyCode.Ctrl || event.keyCode === KeyCode.Alt || event.keyCode === KeyCode.A ) {
      if (this.EventCtrlAltA.includes(event.keyCode)) {
        this.EventCtrlAltA.length = 0;
      }
    }
  }

  /**
  * Hàm xử lý các event nút bấm tắt Ctrl Num1
  * HAN 08.03.2023
  */
  public handleEventCtrlNum1 = (event: any, handle: Function, dataHandle: any = undefined) => {
    if ( event.keyCode === KeyCode.Ctrl || event.keyCode === KeyCode.Num1 || event.keyCode === KeyCode.NumLock1 ) {
      if (!this.EventCtrlNum1.includes(event.keyCode)) {
        this.EventCtrlNum1.push(event.keyCode);
        if (this.EventCtrlNum1.length === 2) {
          event.preventDefault(); 
          // Khi bấm đủ 2 phím sẽ kích hoạt hành động nhấn
          this.EventCtrlNum1.length = 0;
          handle(dataHandle);
        }
      }
    }
  }

  /**
  * Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện Ctrl Num1
  * HAN 08.03.2023
  */
  public handleEventInterruptCtrlNum1 = (event: any) => {
    if ( event.keyCode === KeyCode.Ctrl || event.keyCode === KeyCode.Num1 || event.keyCode === KeyCode.NumLock1 ) {
      if (this.EventCtrlNum1.includes(event.keyCode)) {
        this.EventCtrlNum1.length = 0;
      }
    }
  }

  /**
  * Hàm xử lý các event nút bấm tắt shift delete
  * HAN 08.03.2023
  */
  public handleEventShiftDelete = (event: any, handle: Function, dataHandle: any = undefined) => {
    if ( event.keyCode === KeyCode.Shift || event.keyCode === KeyCode.Delete ) {
      if (!this.EventShiftDelete.includes(event.keyCode)) {
        this.EventShiftDelete.push(event.keyCode);
        if (this.EventShiftDelete.length === 2) {
          event.preventDefault(); 
          // Khi bấm đủ 2 phím sẽ kích hoạt hành động nhấn
          this.EventShiftDelete.length = 0;
          handle(dataHandle);
        }
      }
    }
  }

  /**
  * Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện Shift delete
  * HAN 08.03.2023
  */
  public handleEventInterruptShiftDelete = (event: any) => {
    if ( event.keyCode === KeyCode.Shift || event.keyCode === KeyCode.Delete) {
      if (this.EventShiftDelete.includes(event.keyCode)) {
        this.EventShiftDelete.length = 0;
      }
    }
  }

  /** Hàm xử lý bấm phím F1 */
  public handleEventF1 = (event: any, handle: Function, dataHandle: any = undefined) => {
    if ( event.keyCode === KeyCode.F1){
      event.preventDefault(); 
      handle(dataHandle);
    }
  }

  /**
  * Hàm xử lý các event nút bấm tắt Ctrl Shift S
  * HAN 08.03.2023
  */
  public handleEventFormCtrlShiftS = (event: any, handleEsc: Function, dataEsc: any, handleCtrlShiftS: Function, dataCtrlShiftS: any, handleCtrlS: Function, dataCtrlS: any) => {
    if (event.keyCode === KeyCode.Esc) {
      event.preventDefault(); 
      handleEsc(dataEsc);
      event.preventDefault(); 
    } 
    else if ( event.keyCode === KeyCode.Ctrl || event.keyCode === KeyCode.Shift || event.keyCode === KeyCode.S ) {
      if (!this.EventCtrlShiftS.includes(event.keyCode)) {
        this.EventCtrlShiftS.push(event.keyCode);
        if (this.EventCtrlShiftS.length === 3) {
          event.preventDefault(); 
          // Khi bấm đủ 3 phím sẽ kích hoạt hành động nhấn
          this.EventCtrlShiftS.length = 0;
          handleCtrlShiftS(dataCtrlShiftS);
        } else if (this.EventCtrlShiftS.length === 2) {
          // Nếu số lượng nút bấm mà === 2 trong đó k có nút shift thì sẽ là chức năng khác
          if (!this.EventCtrlShiftS.includes(KeyCode.Shift)) {
            //Không cho trình duyệt mở save as khi bấm ctrl + s
            event.preventDefault(); 
            this.EventCtrlShiftS.length = 0;
            handleCtrlS(dataCtrlS);
          }
        }
      }
    }
  }

  /**
  * Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện Ctrl Shift S
  * HAN 08.03.2023
  */
  public handleEventInterruptFormCtrlShiftS = (event: any) => {
    if ( event.keyCode === KeyCode.Ctrl || event.keyCode === KeyCode.Shift || event.keyCode === KeyCode.S ) {
      if (this.EventCtrlShiftS.includes(event.keyCode)) {
        this.EventCtrlShiftS.length = 0;
      }
    }
  }

  /**
   * Hàm xử lý mở notification wanning
   * HAN 08.03.2023
   */
  public showNotificationWanning = (action: any, message: any = '', data: any = '', callBack: any = () => {}) => {
    this.store.dispatch("config/setToggleShowNotificationWanningAction", 
    { 
      action: action, 
      message: message,
      id: data,
      callBack: callBack,
    });
  }

  /**
   * Hàm xử lý mở notification hỏi
   * HAN 08.03.2023
   */
  public showNotificationAction = (action: any, refuseAction: any, message: any = '', callBack: any = () => {}) => {
    this.store.dispatch("config/setToggleShowNotificationQuestionAction", { action: action, refuseAction: refuseAction, message: message, callBack: callBack});
  }

  /**
   * Hàm xử lý mở notification lỗi
   * HAN 08.03.2023
   */
  public showNotificationError = (message: any = '', callBack: any = () => {}) => {
    this.store.dispatch("config/setToggleShowNotificationErrorAction", {display: message, callBack: callBack});
  }

  /**
   * Hàm xử lý thêm top message
   * 
   */
  public addNotification = (type: any, message: any) => {
    this.store.dispatch('config/addNotification', { type: type, message: message }); 
  }

  /**
   * Hàm xử lý focus vào ô đầu tiên nếu ô đó có lỗi
   * HAN 08.03.2023
   */
  public focusInputError = (tag: any) => {
    setTimeout(() => {
      const elm: any = document.querySelector(`.${tag} .form-group .is-valid .input`);
      if(elm){
        elm.focus();
      }
    }, 100);
  }

  /** 
   * Hàm mở dialog
   * HAN 08.03.2023
   */
  public showDialog = () => {
    this.isShowDialog.value = true;
  }

  /** 
   * Hàm đóng dialog
   * HAN 08.03.2023
   */
  public closeDialog = () => {
    this.isShowDialog.value = false;
  }

  /** 
   * Hàm mở dialog
   * HAN 08.03.2023
   */
  public showResultExcel = () => {
    this.isShowResultExcel.value = true;
  }

  /** 
   * Hàm đóng dialog
   * HAN 08.03.2023
   */
  public closeResultExcel = () => {
    this.isShowResultExcel.value = false;
  }

  /**
   * Hàm mở download file từ url
   * HAN - 08.03.2023
   */
  public downloadFromUrl = (url: any) => {
    window.open(url,);
  }

  /**
   * Hàm chuyển chữ cái đầu thành chữ thường
   * HAN - 08.03.2023
   */
  public lowercaseFirstLetter = (str: string): string => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  /** 
   * Hàm thực hiện set dữ liệu excel sau khi import 
   * HAN - 08.03.2023
  */
  public setResultExcel = (data: any = {
    listFail: [],
    listPass: [],
  }) => {
    this.resultExcel.value = data;
  }

  /** 
   * Hàm thực hiện tính kích thước file
   * HAN - 08.03.2023
  */
  public calcFile = (fileSize: any) => {
    if (fileSize < 1024) { // nếu dung lượng < 1KB
      return fileSize + ' bytes'
    } else if (fileSize >= 1024 && fileSize < 1024 * 1024) { // nếu dung lượng < 1MB
      return (fileSize / 1024).toFixed(2) + ' KB'
    } else { // nếu dung lượng >= 1MB
      return (fileSize / (1024 * 1024)).toFixed(2) + ' MB'
    }
  }

  /**
   * Xoá file excel đã chọn
   * HAN - 08.03.2023
   */
  public removeFileExcel = () => {
    this.fileExcel.value = null;
    this.fileNameExcel.value = null;
    const elm:any = document.getElementById("fileExcel");
    if(elm){
      elm.value = null;
    }
  }

  /**
   * Hàm set kích thước file tối đa có thể nhận từ excel
   * HAN - 08.03.2023
   */
  public setFileSizeMax = (value: number) => {
    this.fileSizeMax.value = value;
  }
}