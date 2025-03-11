import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailRapportPage } from './detail-rapport.page';

describe('DetailRapportPage', () => {
  let component: DetailRapportPage;
  let fixture: ComponentFixture<DetailRapportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRapportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
