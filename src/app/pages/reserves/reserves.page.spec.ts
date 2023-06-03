import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservesPage } from './reserves.page';

describe('ReservesPage', () => {
  let component: ReservesPage;
  let fixture: ComponentFixture<ReservesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReservesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
