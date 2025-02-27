import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmPasswordValidator(nameControlPassword: string, nameControlConfirm: string): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {

        // Obtenemos el control del password y del confirm
        const passwordControl = abstractControl.get(nameControlPassword);
        const confirmControl = abstractControl.get(nameControlConfirm);

        // Sino coinciden, devolvemos un error
        if(passwordControl?.value !== confirmControl?.value){
            const error = { passwordsNotMatched: true };
            confirmControl?.setErrors(error);
        }
        return null;
    };
  }