import { Pipe, PipeTransform } from '@angular/core';
import { IProductExtraOption } from '../models/product.model';

@Pipe({
  name: 'extraSelected',
  standalone: true,
  pure: false
})
export class ExtraSelectedPipe implements PipeTransform {

  transform(options: IProductExtraOption[]): IProductExtraOption | undefined {
    return options.find(option => option.activate);
  }

}
