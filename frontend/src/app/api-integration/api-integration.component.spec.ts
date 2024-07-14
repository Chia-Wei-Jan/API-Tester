import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiIntegrationComponent } from './api-integration.component';

describe('ApiIntegrationComponent', () => {
  let component: ApiIntegrationComponent;
  let fixture: ComponentFixture<ApiIntegrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiIntegrationComponent]
    });
    fixture = TestBed.createComponent(ApiIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
