import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsUserComponent } from './requests-user.component';

describe('RequestsUserComponent', () => {
  let component: RequestsUserComponent;
  let fixture: ComponentFixture<RequestsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsUserComponent]
    });
    fixture = TestBed.createComponent(RequestsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
