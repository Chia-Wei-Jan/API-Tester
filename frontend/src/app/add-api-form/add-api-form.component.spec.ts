import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApiFormComponent } from './add-api-form.component';

describe('AddApiFormComponent', () => {
  let component: AddApiFormComponent;
  let fixture: ComponentFixture<AddApiFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddApiFormComponent]
    });
    fixture = TestBed.createComponent(AddApiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
