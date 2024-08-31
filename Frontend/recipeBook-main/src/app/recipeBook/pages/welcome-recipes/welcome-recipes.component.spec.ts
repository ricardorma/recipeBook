import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeRecipesComponent } from './welcome-recipes.component';

describe('WelcomeRecipesComponent', () => {
  let component: WelcomeRecipesComponent;
  let fixture: ComponentFixture<WelcomeRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelcomeRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
