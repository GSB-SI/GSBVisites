import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MedecinsDuDepartementPage} from './medecins-du-departement.page';

describe('MedecinsDuDepartementPage', () => {
  let component: MedecinsDuDepartementPage;
  let fixture: ComponentFixture<MedecinsDuDepartementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinsDuDepartementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
