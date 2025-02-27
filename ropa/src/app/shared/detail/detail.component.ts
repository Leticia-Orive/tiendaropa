import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ],
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  public showDetail: boolean = true;

  closeDetail(){
    this.showDetail = false;
    setTimeout(() => {
      this.close.emit();
    }, 400);
    
  }

}
