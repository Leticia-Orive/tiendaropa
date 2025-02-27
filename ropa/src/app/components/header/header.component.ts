import { Component, inject, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserOrderService } from '../../services/user-order.service';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatIconModule,MatBadgeModule, NgClass, RouterLinkActive, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private translateService= inject(TranslateService);
  private userOrderService= inject(UserOrderService);
  private authService = inject(AuthService);
  private router = inject(Router);
// signals
  public isAuthenticatedSignal = this.authService.isAuthenticatedSignal;

  public languages: string[] = ['es', 'en'];
  public numProductsSignal: Signal<number> = this.userOrderService.numProductsSignals;

  changeLang(language:string){
    this.translateService.use(language);
  }

  ngOnInit(){
    // comprobamos si estamos estamos
    this.authService.checkIsLogged();
  }

  /**
   *  Nos deslogueamos de la aplicación
   */
  logout(){
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login')

    });
  }

}
