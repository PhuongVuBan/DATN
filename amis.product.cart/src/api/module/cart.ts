import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";
import axiosAPI from "..";

export default class CartApi extends BaseApi {
  constructor(){
    super(ModuleName.Cart + 's');
  }

  /**
   * API lấy chi tiết bản ghi theo id
   * @returns Chi tiết bản ghi
   * HAN - 08.03.2023
   */
  public updateCart = (form: any) => {
    return axiosAPI.get(`/Carts/UpdateCart?v_CurrentUser=${form.v_CurrentUser}&v_ProductID=${form.v_ProductID}&v_State=${form.v_State}`);
  }

  /**
   * API lấy ra đơn đặt hàng 
   * HAN - 08.03.2023
   */
  public getOrderUser = (form: any) => {
    return axiosAPI.get(`/Carts/GetOrderUser?v_CurrentUser=${form.v_CurrentUser}`);
  }

  /**
   * API lấy ra đơn đặt hàng 
   * HAN - 08.03.2023
   */
  public getOrderByID = (form: any) => {
    return axiosAPI.get(`/Carts/GetOrderByID?v_OrderID=${form.v_OrderID}`);
  }

  /**
   * API lấy ra vị trí ship
   * HAN - 08.03.2023
   */
  public getAddress = (form: any) => {
    return axiosAPI.get(`/Carts/GetAddress?v_Address=${form.v_Address}&v_ID=${form.v_ID}`);
  }

  /**
   * API lấy ra vị trí ship
   * HAN - 08.03.2023
   */
  public getStatusOrder = (form: any) => {
    return axiosAPI.get(`/Carts/GetStatusOrder?v_OrderID=${form.v_OrderID}`);
  }

  public checkout = (form: any) => {
    return axiosAPI.post(`/Carts/Checkout`, form);
  }
}