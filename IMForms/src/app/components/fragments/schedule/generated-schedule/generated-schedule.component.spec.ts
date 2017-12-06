import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedScheduleComponent } from './generated-schedule.component';

describe('GeneratedScheduleComponent', () => {
  let component: GeneratedScheduleComponent;
  let fixture: ComponentFixture<GeneratedScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
