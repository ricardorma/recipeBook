import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRecipeComponent } from './layout-recipe.component';

describe('LayoutRecipeComponent', () => {
  let component: LayoutRecipeComponent;
  let fixture: ComponentFixture<LayoutRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
