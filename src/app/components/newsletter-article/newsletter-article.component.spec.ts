import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterArticleComponent } from './newsletter-article.component';

describe('NewsletterArticleComponent', () => {
  let component: NewsletterArticleComponent;
  let fixture: ComponentFixture<NewsletterArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsletterArticleComponent]
    });
    fixture = TestBed.createComponent(NewsletterArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
