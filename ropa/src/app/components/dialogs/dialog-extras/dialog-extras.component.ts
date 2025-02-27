import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { IProductExtraBlock } from '../../../models/product.model';
import { TranslateModule } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { ExtraSelectedPipe } from '../../../pipes/extra-selected.pipe';

@Component({
  selector: 'app-dialog-extras',
  imports: [
    TranslateModule,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    //JsonPipe
    ExtraSelectedPipe
  ],
  templateUrl: './dialog-extras.component.html',
  styleUrl: './dialog-extras.component.scss'
})
export class DialogExtrasComponent {

  private dataDialog = inject(MAT_DIALOG_DATA)
  //crear una propiedad
  public extraBlocks: IProductExtraBlock[] = this.dataDialog['extraBlocks'];

}
