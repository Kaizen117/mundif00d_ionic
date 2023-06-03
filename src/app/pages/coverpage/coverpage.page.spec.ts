import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoverpagePage } from './coverpage.page';

describe('CoverpagePage', () => {
  let component: CoverpagePage;
  let fixture: ComponentFixture<CoverpagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoverpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
