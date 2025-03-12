import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesRapportsPage } from './mes-rapports.page';

describe('MesRapportsPage', () => {
  let component: MesRapportsPage;
  let fixture: ComponentFixture<MesRapportsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MesRapportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
