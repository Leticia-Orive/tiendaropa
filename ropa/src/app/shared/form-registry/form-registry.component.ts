import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TTypeRegistry } from '../../types';

import { AsyncPipe, NgClass } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/category.model';

import moment from 'moment';
import { IRegistry } from '../../models/registry.model';
import { positiveNumberValidator } from '../../validators/positive-number.validator';

@Component({
  selector: 'app-form-registry',
  imports: [ReactiveFormsModule, AsyncPipe, NgClass],
  templateUrl: './form-registry.component.html',
  styleUrl: './form-registry.component.scss',
 
})
export class FormRegistryComponent {

  private categoryService = inject(CategoryService);
  private formBuilder = inject(FormBuilder);
 

  @Input() registry?:  IRegistry;
  @Input({required: true}) typeRegistry!: TTypeRegistry;
  @Output() submitForm: EventEmitter<IRegistry> = new EventEmitter<IRegistry>();

   // Formgroup
   public formRegistry: FormGroup = new FormGroup({});
   public categoriesPromise: Promise<ICategory[]> = this.categoryService.getCategories()

   ngOnInit(){

    this.formRegistry = this.formBuilder.group({
      description: new FormControl(this.registry?.description ?? '', Validators.required),
      date: new FormControl(this.registry ? moment(this.registry.date).format('YYYY-MM-DD'): moment().format('YYYY-MM-DD')),
      type: new FormControl(this.typeRegistry),
      idCategory: new FormControl(this.registry?.idCategory ?? ''),
      quantity: new FormControl(this.registry?.quantity ?? '0', [Validators.required, positiveNumberValidator()]),
      id: new FormControl(this.registry?.id ?? ''),
      user: new FormControl(this.registry?.user)
    })

  }
  get controlQuantity() {
    return this.formRegistry.get('quantity')
  }

  /**
  * Hace submit al formulario
  */
  submit(){
    const registry = this.formRegistry.value as IRegistry;
    this.submitForm.emit(registry);
  }


  

}
