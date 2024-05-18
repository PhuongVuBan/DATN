import { Product } from "../inventory/product";
import { CurrentUser } from "../services-system/current_user";

export class Cart extends CurrentUser {
  public couponID?: string = '';
  public couponCode?: string = '';
  public percent?: number = 0;
  public cartDetail: CartDetail [] = [];
}

export class CartDetail extends Product {
  public cartDetailID: string = '';
  public currentUser: string = '';
  public quantity: number = 1;
}