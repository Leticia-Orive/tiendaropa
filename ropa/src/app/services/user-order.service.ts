import { Injectable, Signal } from '@angular/core';
import { Order } from '../models/order.model';
import { IProduct } from '../models/product.model';
import { IQuantityProduct } from '../models/quantity-product.model';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {

  private _order: Order = new Order();

  public productsSignals: Signal<IQuantityProduct[]> = this._order.productsSignal;
  public numProductsSignals: Signal<number> = this._order.numProductsSignal;
  public totalOrderSignal: Signal<number> = this._order.totalOrderSignal;
  
  public addProduct(product: IProduct, quantity: number = 1){
    this._order.addProduct(product, quantity);
  }

  public oneMoreProduct(product: IProduct){
    this._order.oneMoreProduct(product);
  }

  public oneLessProduct(product: IProduct){
    this._order.oneLessProduct(product);
  }

  public resetOrder(){
    this._order.resetOrder();
  }
}
