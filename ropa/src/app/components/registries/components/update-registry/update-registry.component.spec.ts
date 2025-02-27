import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRegistryComponent } from './update-registry.component';

describe('UpdateRegistryComponent', () => {
  let component: UpdateRegistryComponent;
  let fixture: ComponentFixture<UpdateRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRegistryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
