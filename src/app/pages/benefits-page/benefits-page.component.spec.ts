import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsPageComponent } from './benefits-page.component';

describe('BenefitsPageComponent', () => {
  let component: BenefitsPageComponent;
  let fixture: ComponentFixture<BenefitsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BenefitsPageComponent]
    });
    fixture = TestBed.createComponent(BenefitsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
