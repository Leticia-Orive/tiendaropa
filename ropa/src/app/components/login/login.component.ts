import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAuthCredentials } from '../../models/auth-credentials';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService)
  private toastrService = inject(ToastrService)
  private router = inject(Router)

  // Gormgroup
  public formLogin: FormGroup = new FormGroup({});

  ngOnInit(){
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  /**
   * Nos logueamos en la aplicacion
   */
  login(){

    // Obtenemos las credenciales
    const authCredentials = this.formLogin.value as IAuthCredentials;

    // Hacemos login
    this.authService.login(authCredentials).then( () => {
      this.toastrService.success(
        'Logueado',
        'Éxito'
      );
      this.router.navigateByUrl('registries')
    }, error => {
      console.error(error);
      this.toastrService.error(
        'El usuario no existe o la contraseña es incorrecta',
        'Error'
      );
    })

  }


}
