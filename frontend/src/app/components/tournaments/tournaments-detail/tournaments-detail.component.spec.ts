import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsDetailComponent } from './tournaments-detail.component';

describe('TournamentsDetailComponent', () => {
  let component: TournamentsDetailComponent;
  let fixture: ComponentFixture<TournamentsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
