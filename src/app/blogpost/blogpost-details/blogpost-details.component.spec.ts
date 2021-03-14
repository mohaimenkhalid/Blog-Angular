import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostDetailsComponent } from './blogpost-details.component';

describe('BlogpostDetailsComponent', () => {
  let component: BlogpostDetailsComponent;
  let fixture: ComponentFixture<BlogpostDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogpostDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
