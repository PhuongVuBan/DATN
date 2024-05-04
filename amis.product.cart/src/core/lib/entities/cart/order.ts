import { Product } from "../inventory/product";
import { CurrentUser } from "../services-system/current_user";
import { StatusOrder } from "../services-system/enum";

export class Order extends CurrentUser {
  public orderID: string;
  public userName: string = '';
  public phoneNumber: string = '';
  public email: string = '';
  public province: string = '';
  public district: string = '';
  public ward: string = '';
  public address: string = '';
  public description: string = '';
  public typeCheckout: number = 1;
  public couponID?: string = '';
  public couponCode: string = '';
  public percent: number = 0;
  public status: StatusOrder = StatusOrder.WaitConfirm;
  public orderDetail: OrderDetail [] = [];
}

export class OrderDetail extends Product {
  public orderDetailID: string = '';
  public orderID: string = '';
  public quantity: number = 1;
  public priceOrder: number = 0;
}