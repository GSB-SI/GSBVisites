import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateRapportPage } from './update-rapport.page';

describe('UpdateRapportPage', () => {
  let component: UpdateRapportPage;
  let fixture: ComponentFixture<UpdateRapportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRapportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
