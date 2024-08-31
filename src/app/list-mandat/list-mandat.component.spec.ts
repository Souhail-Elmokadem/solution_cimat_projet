import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMandatComponent } from './list-mandat.component';

describe('ListMandatComponent', () => {
  let component: ListMandatComponent;
  let fixture: ComponentFixture<ListMandatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMandatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMandatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
