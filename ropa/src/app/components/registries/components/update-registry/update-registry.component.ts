import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormRegistryComponent } from '../../../../shared/form-registry/form-registry.component';
import { IRegistry } from '../../../../models/registry.model';
import { TTypeRegistry } from '../../../../types';
import { RegistryService } from '../../../../services/registry.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-registry',
  standalone: true,
  imports: [FormRegistryComponent],
  templateUrl: './update-registry.component.html',
  styleUrl: './update-registry.component.scss'
})
export class UpdateRegistryComponent {

  private registryService = inject(RegistryService);
  private toastrService = inject(ToastrService)

  @Input({ required: true }) registry!: IRegistry;
  @Input({ required: true }) typeRegistry!: TTypeRegistry;

  @Output() registryUpdated: EventEmitter<void> = new EventEmitter<void>()

  updateRegistry(registry: IRegistry){

    this.registryService.updateRegistry(registry).then( () => {
      this.toastrService.success(
        'Registro actualizado',
        'Éxito'
      )
      this.registryUpdated.emit();
    }, error => {
      this.toastrService.error(
        'Error al actualizar el registro',
        'Error'
      )
    })

  }


}
