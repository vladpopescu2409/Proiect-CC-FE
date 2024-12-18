import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullDetailedArticleComponent } from './full-detailed-article.component';

describe('FullDetailedArticleComponent', () => {
  let component: FullDetailedArticleComponent;
  let fixture: ComponentFixture<FullDetailedArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullDetailedArticleComponent]
    });
    fixture = TestBed.createComponent(FullDetailedArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
