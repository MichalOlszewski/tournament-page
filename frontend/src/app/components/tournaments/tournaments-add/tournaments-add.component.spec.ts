import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsAddComponent } from './tournaments-add.component';

describe('TournamentsAddComponent', () => {
  let component: TournamentsAddComponent;
  let fixture: ComponentFixture<TournamentsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
