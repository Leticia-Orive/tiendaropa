import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap'
import { IModal } from './models/modal.model';


@Component({
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @ViewChild("modal", { static: true }) modal!: ElementRef

  public modalData?: IModal;

  public close: EventEmitter<void> = new EventEmitter<void>();
  public accept: EventEmitter<void> = new EventEmitter<void>();
  public rendered: EventEmitter<void> = new EventEmitter<void>();

  private modalInstance!: Modal;

  ngAfterViewInit(){
    this.modalInstance = new Modal(this.modal.nativeElement);
    this.rendered.emit();
  }

  open(){
    if(this.modalInstance){
      this.modalInstance.show();
    }
  }

  hide(){
    if(this.modalInstance){
      this.modalInstance.hide();
      this.close.emit();
    }
  }

  confirm(){
    if(this.modalInstance){
      this.modalInstance.hide();
      this.accept.emit();
    }
  }

}
