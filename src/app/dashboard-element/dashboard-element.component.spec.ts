import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardElementComponent } from './dashboard-element.component';

describe('DashboardElementComponent', () => {
  let component: DashboardElementComponent;
  let fixture: ComponentFixture<DashboardElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
