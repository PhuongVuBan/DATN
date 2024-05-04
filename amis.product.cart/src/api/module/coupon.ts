import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";
import axiosAPI from "..";

export default class CouponApi extends BaseApi {
  constructor(){
    super(ModuleName.Coupon + 's');
  }

  public getRecordByCode = (id: any) => {
    return axiosAPI.get(`/${this.Module}/GetByCode/${id}`);
  }
}