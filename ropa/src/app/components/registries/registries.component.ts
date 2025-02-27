import { Component, effect, inject, Injector, model, signal, WritableSignal } from '@angular/core';
import { DetailComponent } from '../../shared/detail/detail.component';
import { AddRegistryComponent } from './components/add-registry/add-registry.component';
import { TTypeRegistry } from '../../types';

import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { GetCategoryPipe } from '../../pipes/get-category.pipe';
import { FilterComponent } from '../../shared/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { IFilter } from '../../shared/filter/models/filter.model';
import moment from 'moment';
import { UpdateRegistryComponent } from './components/update-registry/update-registry.component';
import { ModalService } from '../../shared/modal/services/modal.service';
import { IModal } from '../../shared/modal/models/modal.model';
import { ToastrService } from 'ngx-toastr';
import { IRegistry } from '../../models/registry.model';
import { RegistryService } from '../../services/registry.service';

@Component({
  selector: 'app-registries',
  standalone: true,
  imports: [DetailComponent, AddRegistryComponent, DatePipe, NgClass, GetCategoryPipe, 
    AsyncPipe, FilterComponent, FormsModule, UpdateRegistryComponent],
  templateUrl: './registries.component.html',
  styleUrl: './registries.component.scss',
  providers: [
    ModalService
  ]
})
export class RegistriesComponent {

  private registryService = inject(RegistryService)
  private injector = inject(Injector)
  private modalService = inject(ModalService)
  private toastrService = inject(ToastrService)

  public registrySelected?: IRegistry;
  public showDetail = false;
  public typeRegistry: TTypeRegistry = 'deposit';
  public filterSignal: WritableSignal<IFilter> = signal({
    category: '',
    dateStart: moment().startOf('month').format('YYYY-MM-DD'),
    dateEnd: moment().endOf('month').format('YYYY-MM-DD')
  })

  public registriesSignal = this.registryService.registriesSignal.asReadonly();
  public nextRegistriesSignal = this.registryService.nextRegistriesSignal.asReadonly()
  public previousRegistriesSignal = this.registryService.previousRegistriesSignal.asReadonly()
  public totalRegistriesSignal = this.registryService.totalRegistriesSignal.asReadonly()
  public totalQuantityRegistriesSignal = this.registryService.totalQuantityRegistriesSignal.asReadonly()
  
  ngOnInit(){
    this.next();
    effect(() => {
      this.registryService.sumRegistries(this.filterSignal())
      this.registryService.totalRegistries(this.filterSignal());
    }, { injector: this.injector })
  }
  
  openDetail(type: TTypeRegistry){
    this.typeRegistry = type;
    this.showDetail = true;
  }

  openUpdateDetail(registry: IRegistry){
    this.registrySelected = registry;
    this.openDetail(this.registrySelected.type);
  }

  openModalConfirm(registry: IRegistry){
    const modalConfirm: IModal ={
      content: '¿Estás seguro de eliminar este registro?',
    }
    this.modalService.open(modalConfirm).subscribe({
      next: () => {
        this.deleteRegistry(registry)

      }

    })
  }

  closeDetail(actionSuccess: boolean = false){
    this.showDetail = false;
    if(actionSuccess){
      this.registryService.resetPagination();
      this.next();
      this.filterSignal.set({ ...this.filterSignal() })
    }
    this.registrySelected = undefined;
  }

  previous(){
    this.registryService.getRegistries(this.filterSignal(), 'previous')
  }

  next(){
    this.registryService.getRegistries(this.filterSignal(), 'next')
  }

  onFilter(filter: IFilter){
    this.filterSignal.set({ ...filter })
    console.log(this.filterSignal());
    this.registryService.resetPagination()
    this.next();
  }

  deleteRegistry(registry: IRegistry){
    const idRegistry = registry.id;
    this.registryService.deleteRegistry(idRegistry).then( () => {
      this.toastrService.success(
        'Registro eliminado correctamente',
        'Exito'
      );
      this.registryService.resetPagination()
      this.next();
      this.filterSignal.set({ ...this.filterSignal() })

    }, (error) => {
      console.error(error);
      this.toastrService.error(
        'no se ha podido eliminar el registro',
        'Exito'
      );
  })
}

  ngOnDestroy(){
    this.registryService.reset();
  }

}

