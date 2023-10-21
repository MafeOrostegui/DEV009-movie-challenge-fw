import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCardsComponent } from './category-cards.component';

describe('CategoryCardsComponent', () => {
  let component: CategoryCardsComponent;
  let fixture: ComponentFixture<CategoryCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryCardsComponent]
    });
    fixture = TestBed.createComponent(CategoryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
