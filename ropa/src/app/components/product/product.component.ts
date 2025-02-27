import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, first } from 'rxjs';
import { IProduct, IProductExtraOption } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { AsyncPipe, JsonPipe, Location, NgClass } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDivider } from '@angular/material/divider';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import { ExtraSelectedPipe } from '../../pipes/extra-selected.pipe';
import { CalculateTotalPricePipe } from '../../pipes/calculate-total-price.pipe';
import { UserOrderService } from '../../services/user-order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product',
  imports: [AsyncPipe, TranslateModule, MatDivider, MatMiniFabButton, MatIcon, MatButton, NgClass,
    MatCard, MatCardContent, FormsModule, MatCheckbox, MatRadioModule, ExtraSelectedPipe, CalculateTotalPricePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private location: Location = inject(Location);
  private UserOrderService = inject(UserOrderService);
  private router = inject(Router);
  private SnackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);

  public product$: Observable<IProduct> = new Observable<IProduct>();
  public quantitySignal: WritableSignal<number> = signal(1);

  ngOnInit(){
    this.activatedRoute.params.pipe(first()).subscribe({
      next: (params: Params) => {
        const productId = params['id'];
        this.product$ = this.productsService.getProducts(productId);
      }
    })
  }

  addProduct(product: IProduct){
    console.log(product)
    this.UserOrderService.addProduct(product, this.quantitySignal());
    console.log(this.UserOrderService.productsSignals());
    this.SnackBar.open(
      this.translateService.instant('label.add.product.success'),
      this.translateService.instant('label.ok'),
      {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      }
    );
    this.router.navigateByUrl('/categories');
  }
  
  goBack(){
    this.location.back();
  }

  oneLessProduct(){
    this.quantitySignal.update(value => value - 1);
  }
  oneMoreProduct(){
    this.quantitySignal.update(value => value + 1);
  }
  changeOption(options: IProductExtraOption[], change: MatRadioChange){
    options.forEach(option => option.activate = false);
    change.value.activate = true;
  }

}

