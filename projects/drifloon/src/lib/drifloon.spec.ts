import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Drifloon } from './drifloon';

describe('Drifloon', () => {
  let component: Drifloon;
  let fixture: ComponentFixture<Drifloon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Drifloon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Drifloon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
