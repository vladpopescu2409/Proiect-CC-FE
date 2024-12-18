import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsPageComponent } from './requests-page.component';

describe('RequestsPageComponent', () => {
  let component: RequestsPageComponent;
  let fixture: ComponentFixture<RequestsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsPageComponent]
    });
    fixture = TestBed.createComponent(RequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
