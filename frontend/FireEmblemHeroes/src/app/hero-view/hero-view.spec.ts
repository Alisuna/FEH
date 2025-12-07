import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroView } from './hero-view';

describe('HeroView', () => {
  let component: HeroView;
  let fixture: ComponentFixture<HeroView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
