import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormCategoryComponent } from '../../../../shared/form-category/form-category.component';
import { ICategory } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-category',
  imports: [FormCategoryComponent],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent {
  private categoryService = inject(CategoryService);
  private toastrService = inject(ToastrService);

  @Input({ required: true }) category!: ICategory;

  @Output() categoryUpdated: EventEmitter<void> = new EventEmitter<void>()

  updateCategory(category: ICategory){

    this.categoryService.updateCategory(category).then( () => {
      this.toastrService.success(
        'Categoría actualizada',
        'Éxito'
      )
      // Indicamos que hemos actualizado la categoria
      this.categoryUpdated.emit();
    }, error => {
      console.error(error);
      this.toastrService.error(
        'Error al actualizar la categoría',
        'Error'
      )
    })

  }

}
