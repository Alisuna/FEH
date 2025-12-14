import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHero } from './create-hero';

describe('CreateHero', () => {
  let component: CreateHero;
  let fixture: ComponentFixture<CreateHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
