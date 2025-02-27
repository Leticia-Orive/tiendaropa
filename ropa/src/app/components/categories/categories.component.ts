import { Component, inject } from '@angular/core';
import { ICategory } from '../../models/category.model';

import {  NgStyle } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';
import { DetailComponent } from '../../shared/detail/detail.component';
import { IModal } from '../../shared/modal/models/modal.model';
import { ModalService } from '../../shared/modal/services/modal.service';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';

@Component({
  selector: 'app-categories',
  imports: [DetailComponent, AddCategoryComponent, NgStyle, UpdateCategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  providers: [
    ModalService
  ]
})
export class CategoriesComponent {
  private categoryService = inject(CategoryService)
  private modalService = inject(ModalService)
  private toastrService = inject(ToastrService)


  public showDetail: boolean = false;
  public categorySelected?: ICategory;

  // signals
  public categoriesSignal = this.categoryService.categoriesSignal.asReadonly();
  public totalCategoriesSignal = this.categoryService.totalCategoriesSignal.asReadonly();
  public nextCategoriesSignal = this.categoryService.nextCategoriesSignal.asReadonly();
  public previousCategoriesSignal = this.categoryService.previousCategoriesSignal.asReadonly();

  ngOnInit(){
   this.next()
  }
  


/**
   * Abre el detalle para añadir la categoria
   */
  openDetail(){
    this.showDetail = true;
  }

  /**
   * Abre el detalle para actualizar la categoria
   * @param category 
   */
  openUpdateDetail(category: ICategory){
    this.categorySelected = category;
    this.openDetail();
    
  }



  /**
   * Cierra el detalle, si la acción se completó, pedimos los datos de nuevo
   * @param actionSuccess 
   */
  closeDetail(actionSuccess: boolean = false){
    this.showDetail = false;
    if(actionSuccess){
      this.categoryService.resetPagination()
      this.next();
    }
    this.categorySelected = undefined;
  }

  /**
   * Abrimos un modal para confirmar si queremos borrar la categoria
   * @param category 
   */
  openModalConfirm(category: ICategory){
    const modalConfirm: IModal = {
      content: '¿Estas seguro de querer borrar la categoría?'
    }
    // Mostramos el modal
    this.modalService.open(modalConfirm).subscribe({
      next: () => {
        this.deleteCategory(category);
      }
    })
  }

  /**
   * Borramos la categoria
   * @param category 
   */
  deleteCategory(category: ICategory){
    const idCategory: string = category.id;
    // Borramos la categoria
    this.categoryService.deleteCategory(idCategory).then( () => {
      this.toastrService.success(
        'Categoría eliminada',
        'Éxito'
      )
      this.categoryService.resetPagination();
      this.next()
    }, error => {
      console.error(error);
      this.toastrService.error(
        'Error al eliminar la categoría',
        'Error'
      )
    })
  }
 
   /**
   * Obtenemos las categorias anteriores
   */
   previous(){
    this.categoryService.getCategories('previous');
  }

  /**
    * Obtenemos las categorias posteriores
   */
  next(){
    this.categoryService.getCategories('next');
  }

 /**
   * Al salir, reseteamos los valores
   */
 ngOnDestroy(){
  this.categoryService.reset();
}
}
