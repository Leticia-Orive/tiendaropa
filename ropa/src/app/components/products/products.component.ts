import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { RouterLink, ActivatedRoute, Params } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, first } from 'rxjs';
import { IProduct } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, MatCard, MatCardContent, TranslateModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  public products$: Observable<IProduct[]> = new Observable<IProduct[]>();

  ngOnInit() {
    this.activatedRoute.params.pipe(first()).subscribe({
      next: (params: Params) => {
        const categoryId = params['categoryId'];
        if (categoryId) {
          // Peticion al servidor
          this.products$ = this.productsService.getProducts(categoryId);
        } else {
          console.error('Category ID is not defined');
        }
      },
      error: (err) => {
        console.error('Error retrieving route parameters', err);
      }
    });
  }

}
