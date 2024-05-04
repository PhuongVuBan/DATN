import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";

export default class DepotApi extends BaseApi {
  constructor(){
    super(ModuleName.Depot + 's');
  }
}