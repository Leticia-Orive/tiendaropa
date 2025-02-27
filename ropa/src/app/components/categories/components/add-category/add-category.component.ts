import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormCategoryComponent } from '../../../../shared/form-category/form-category.component';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-add-category',
  imports: [FormCategoryComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  private categoryService = inject(CategoryService)
  private toastrService = inject(ToastrService)

  @Output() categorySaved: EventEmitter<void> = new EventEmitter<void>();

   /**
   * Creamos la categoria
   * @param category 
   */
   createCategory(category: ICategory){

    this.categoryService.createCategory(category).then( () => {
      this.toastrService.success(
        'Categoría creada',
        'Éxito'
      )
      // Indicamos que hemos guardado la categoria
      this.categorySaved.emit();
    }, error => {
      console.error(error);
      this.toastrService.error(
        'Error al crear la categoría',
        'Error'
      )
    })

  }

}
