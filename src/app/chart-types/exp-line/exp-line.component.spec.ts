import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpLineComponent } from './exp-line.component';

describe('ExpLineComponent', () => {
  let component: ExpLineComponent;
  let fixture: ComponentFixture<ExpLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
