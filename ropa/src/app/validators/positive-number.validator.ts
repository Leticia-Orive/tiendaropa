import { AbstractControl, ValidatorFn } from "@angular/forms";

export function positiveNumberValidator(): ValidatorFn {
    return (abstractControl: AbstractControl) => {
        const isValid = +abstractControl.value >= 0
        // Si el valor del control, es menor que 0, devuelve error
        return isValid ? null : { negativeNumber: true }
    }
}