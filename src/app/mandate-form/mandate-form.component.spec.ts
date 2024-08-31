import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateFormComponent } from './mandate-form.component';

describe('MandateFormComponent', () => {
  let component: MandateFormComponent;
  let fixture: ComponentFixture<MandateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MandateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
