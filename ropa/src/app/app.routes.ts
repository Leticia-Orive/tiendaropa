import { Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { PayOrderComponent } from './components/pay-order/pay-order.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { payOrderGuard } from './guards/pay-order.guard';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { RegistriesComponent } from './components/registries/registries.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/login/login.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login'])

export const routes: Routes = [
    { path: 'categories', component: CategoriesComponent,canActivate: [AuthGuard],data: {
            authGuardPipe: redirectToLogin}
     },
    { path: 'products/:categoryId', component: ProductsComponent, canActivate: [AuthGuard],data: {
        authGuardPipe: redirectToLogin} },
    { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard],data: {
        authGuardPipe: redirectToLogin} },
    { path: 'pay-order', component: PayOrderComponent, canActivate: [payOrderGuard] },
    {path: 'registries',component: RegistriesComponent, canActivate: [AuthGuard],data: {
            authGuardPipe: redirectToLogin} },
    {path: 'graphics',component: GraphicsComponent, canActivate: [AuthGuard],data: {
            authGuardPipe: redirectToLogin
        } 
    },
    {path: 'login', component: LoginComponent},  
    
    {path: 'create-account',component: CreateAccountComponent},
    { path: '**', redirectTo: 'registries' }
];
