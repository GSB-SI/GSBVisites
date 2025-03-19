import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateRapportPage} from './create-rapport.page';

describe('CreateRapportPage', () => {
  let component: CreateRapportPage;
  let fixture: ComponentFixture<CreateRapportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRapportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
