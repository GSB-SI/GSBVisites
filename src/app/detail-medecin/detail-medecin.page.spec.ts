import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DetailMedecinPage} from './detail-medecin.page';

describe('DetailMedecinPage', () => {
  let component: DetailMedecinPage;
  let fixture: ComponentFixture<DetailMedecinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMedecinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
