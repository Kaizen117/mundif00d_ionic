import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllergensPage } from './allergens.page';

describe('AllergensPage', () => {
  let component: AllergensPage;
  let fixture: ComponentFixture<AllergensPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllergensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
