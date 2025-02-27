import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-dialog-ticket',
  imports: [
    TranslateModule,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: './dialog-ticket.component.html',
  styleUrl: './dialog-ticket.component.scss'
})
export class DialogTicketComponent {

    private dataDialog = inject(MAT_DIALOG_DATA)
    //crear una propiedad
    public ticket : number = this.dataDialog['ticket'];

}
