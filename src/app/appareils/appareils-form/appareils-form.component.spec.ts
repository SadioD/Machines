import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppareilsFormComponent } from './appareils-form.component';

describe('AppareilsFormComponent', () => {
  let component: AppareilsFormComponent;
  let fixture: ComponentFixture<AppareilsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppareilsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppareilsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
