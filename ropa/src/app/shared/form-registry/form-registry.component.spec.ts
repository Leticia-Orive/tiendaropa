import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistryComponent } from './form-registry.component';

describe('FormRegistryComponent', () => {
  let component: FormRegistryComponent;
  let fixture: ComponentFixture<FormRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegistryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
