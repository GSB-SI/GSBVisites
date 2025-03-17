import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteRapportPage } from './delete-rapport.page';

describe('DeleteRapportPage', () => {
  let component: DeleteRapportPage;
  let fixture: ComponentFixture<DeleteRapportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRapportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
