import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestEachComponent } from './request-each.component';

describe('RequestEachComponent', () => {
  let component: RequestEachComponent;
  let fixture: ComponentFixture<RequestEachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestEachComponent]
    });
    fixture = TestBed.createComponent(RequestEachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
