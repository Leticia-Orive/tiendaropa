import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { CategoryService } from "../services/category.service";

export function categoryExistsValidator(categoryService: CategoryService, originalName?: string): AsyncValidatorFn{
    return async (control: AbstractControl) => {

        // sino tiene valor o tiene el nombre original, indicamos que no hay error
        if(!control.value || (originalName && originalName == control.value)){
            return null;
        }

        // Obtengo la categoria
        const existsCategory = await categoryService.categoryExists(control.value);
        // si existe, devolvemos error
        return existsCategory ? { categoryExists: true } : null;
    }

}