import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserOrderService } from '../services/user-order.service';

export const payOrderGuard: CanActivateFn = (route, state) => {
  //Inyectamos el servicio
  const userOrderService = inject(UserOrderService);
  return userOrderService.numProductsSignals() > 0;
};
