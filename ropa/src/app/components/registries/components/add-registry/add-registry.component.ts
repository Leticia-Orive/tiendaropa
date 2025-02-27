import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormRegistryComponent } from '../../../../shared/form-registry/form-registry.component';
import { TTypeRegistry } from '../../../../types';
import { IRegistry } from '../../../../models/registry.model';
import { RegistryService } from '../../../../services/registry.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-registry',
  imports: [FormRegistryComponent],
  templateUrl: './add-registry.component.html',
  styleUrl: './add-registry.component.scss'
})
export class AddRegistryComponent {

  private registryService = inject(RegistryService);
  private toastrService = inject(ToastrService);

  @Input({ required: true }) typeRegistry!: TTypeRegistry;
  @Output() registrySaved: EventEmitter<void> = new EventEmitter<void>()

  createRegistry(registry: IRegistry){
    this.registryService.createRegistry(registry).then(() => {
      this.toastrService.success(
        'registro creado',
        'Exito'
      );
      // Indicamos si hemos guardado el registro
      this.registrySaved.emit();

    }, error => {
      this.toastrService.error(
        'Error al crear el registro',
        'Error'
      )
    })
    
  }

}
