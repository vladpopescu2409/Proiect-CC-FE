import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullArticlePageComponent } from './full-article-page.component';

describe('FullArticlePageComponent', () => {
  let component: FullArticlePageComponent;
  let fixture: ComponentFixture<FullArticlePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullArticlePageComponent]
    });
    fixture = TestBed.createComponent(FullArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
