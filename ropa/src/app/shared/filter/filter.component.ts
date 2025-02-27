import { booleanAttribute, Component, forwardRef, inject, Input, numberAttribute } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IFilter } from './models/filter.model';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/category.model';
import { AsyncPipe } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FilterComponent),
    multi: true
  }]
})
export class FilterComponent implements ControlValueAccessor {

  private categoryService = inject(CategoryService)

  @Input({ transform: booleanAttribute }) onlyYear: boolean = false;
  @Input({ transform: numberAttribute }) startYear: number = 2020;
  @Input({ transform: numberAttribute }) endYear: number = 2030;



  public categoriesPromise: Promise<ICategory[]> = this.categoryService.getCategories()
  public years: number[] = [];
  public yearSelected: number = 0;

  private onChange: any = () => {}
  private onTouched = () => {}

  public filterForm: IFilter = {
    category: '',
    dateEnd: '',
    dateStart: ''
  }

  ngOnInit(){

    if(this.onlyYear){
      // Inicializacion de años
      for (let year = this.startYear; year <= this.endYear; year++) {
        this.years.push(year);
      }
      // Inicializacion del año seleccionado
      this.yearSelected = moment().year();
    }

  }

  onFilter(){
    // Si solo seleccionamos el año, modificamos la fecha de inicio y fin
    if(this.onlyYear){
      this.filterForm.dateStart = moment(this.yearSelected, 'YYYY').startOf('year').format('YYYY-MM-DD');
      this.filterForm.dateEnd =  moment(this.yearSelected, 'YYYY').endOf('year').format('YYYY-MM-DD');
    }
    this.onChange(this.filterForm)
    this.onTouched();
  }

  writeValue(obj: IFilter): void {
    this.filterForm = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
