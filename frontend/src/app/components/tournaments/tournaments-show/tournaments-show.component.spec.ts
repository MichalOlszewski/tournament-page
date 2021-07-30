import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsShowComponent } from './tournaments-show.component';

describe('TournamentsShowComponent', () => {
  let component: TournamentsShowComponent;
  let fixture: ComponentFixture<TournamentsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentsShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
