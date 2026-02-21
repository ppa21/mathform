import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Equation } from './equation';

describe('Equation', () => {
  let component: Equation;
  let fixture: ComponentFixture<Equation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Equation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Equation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
