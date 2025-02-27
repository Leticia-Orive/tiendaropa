import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';

@Pipe({
  name: 'calculateTotalPrice',
  standalone: true,
  pure: false
})
export class CalculateTotalPricePipe implements PipeTransform {

  transform(product: IProduct, quantity: number = 1): number {
    let priceProduct = product.price;

    if(product.extras){
      priceProduct += product.extras.reduce((acc, extra) => {
        return acc + extra.blocks.reduce((blockAcc, block) => {
          const activeOption = block.options.find(option => option.activate );
          return blockAcc + (activeOption ? activeOption.price : 0);
        },0)
      },0)

    }
    const total = priceProduct * quantity;
    return +total.toFixed(2)
  }

}
