import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppareilsViewComponent } from './appareils-view.component';

describe('AppareilsViewComponent', () => {
  let component: AppareilsViewComponent;
  let fixture: ComponentFixture<AppareilsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppareilsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppareilsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
