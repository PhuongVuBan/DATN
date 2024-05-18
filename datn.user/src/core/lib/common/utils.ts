import { UtilsComponents } from './utils_components';
import { useStore } from "vuex";

/**
 * Chứa các hàm base đã xây dựng
 * HAN - 08.03.2023
 */
export class Utils extends UtilsComponents{
  /** Store vuex */
  public store = useStore();

  /**
   * Hàm khởi tạo lấy ra page size
   */
  constructor(){
    super();
  }
}