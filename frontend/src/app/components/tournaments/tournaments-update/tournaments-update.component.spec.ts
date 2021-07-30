import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsUpdateComponent } from './tournaments-update.component';

describe('TournamentsUpdateComponent', () => {
  let component: TournamentsUpdateComponent;
  let fixture: ComponentFixture<TournamentsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
