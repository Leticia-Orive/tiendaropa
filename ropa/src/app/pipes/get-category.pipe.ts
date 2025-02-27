import { inject, Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Pipe({
  name: 'getCategory'
})
export class GetCategoryPipe implements PipeTransform {
  private categoryService = inject(CategoryService)

  transform(value: string ): Promise<ICategory> {
    // Devuelve una promesa para obtener la categoria
    return this.categoryService.getCategory(value);
  }

}
