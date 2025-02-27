import { inject, Injectable, ViewContainerRef } from '@angular/core';
import { IModal } from '../models/modal.model';
import { ModalComponent } from '../modal.component';
import { finalize, first, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private viewContainerRef = inject(ViewContainerRef)

  private createModal(modalData: IModal){

    // creo un ModalComponent
    const modalComponentRef = this.viewContainerRef.createComponent(ModalComponent);

    // Relleno el componente
    modalComponentRef.instance.modalData = {
      title: modalData.title ?? 'Confirmación',
      content: modalData.content,
      btnTextAccept: modalData.btnTextAccept ?? 'Aceptar',
      btnTextClose: modalData.btnTextClose ?? 'Cerrar'
    }

    // Quedo pendiente del evento close para destruir el componente
    modalComponentRef.instance.close.pipe(first()).subscribe({
      next: () =>{
        modalComponentRef.destroy();
      }
    })
    
    return modalComponentRef;

  }


  open(modalData: IModal){
    // creo el modal
    const modal = this.createModal(modalData)
    // Quedo pendiente al evento rendered
    return modal.instance.rendered.pipe(
      first(),
      switchMap( () => {
        // abro el modal
        modal.instance.open();
        // Quedo pendiente al evento accept
        // Al finalizar, destruimos el modal
        return modal.instance.accept.pipe(
          first(),
          finalize( () => modal.destroy())
        )
      })
    )
   
  }
}
