import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostCategoriesComponent } from './blogpost-categories.component';

describe('BlogpostCategoriesComponent', () => {
  let component: BlogpostCategoriesComponent;
  let fixture: ComponentFixture<BlogpostCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogpostCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpostCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
