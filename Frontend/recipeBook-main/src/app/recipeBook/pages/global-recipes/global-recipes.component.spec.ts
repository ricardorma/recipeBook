import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalRecipesComponent } from './global-recipes.component';

describe('GlobalRecipesComponent', () => {
  let component: GlobalRecipesComponent;
  let fixture: ComponentFixture<GlobalRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
