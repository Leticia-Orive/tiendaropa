import { inject, Injectable, signal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { IAuthCredentials } from '../models/auth-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private afApp = inject(FirebaseApp)
  private auth: Auth = getAuth(this.afApp)

  public isAuthenticatedSignal = signal<boolean>(this.isLoggedIn())


  /**Creamos un metodo */
   /**
   * Comprueba si esta logueado, queda pendiente si se loguea/desloguea
   */
   checkIsLogged(){
    onAuthStateChanged(this.auth, (user) => {
      console.log(user);
      this.isAuthenticatedSignal.set(user !== null)
    })
  }

   /**
   * Nos loguea en firebase
   * @param authCredentials 
   * @returns 
   */
  login(authCredentials: IAuthCredentials){
    return signInWithEmailAndPassword(this.auth, authCredentials.email, authCredentials.password);
  }

   /**
   * Crea una cuenta en firebase
   * @param authCredentials 
   * @returns 
   */
   createAccount(authCredentials: IAuthCredentials){
    return createUserWithEmailAndPassword(this.auth, authCredentials.email, authCredentials.password).then( () => this.login(authCredentials))
  }

   /**
   * Nos desloguea de la aplicación
   * @returns 
   */
   logout(){
    return signOut(this.auth);
  }

  /**
   * Indicamos si esta o no logueado
   * @returns 
   */
  isLoggedIn(){
    return this.auth.currentUser !== null
  }

  // Indica el usuario actual
  currentUser(){
    return this.auth.currentUser?.email;
  }

}
