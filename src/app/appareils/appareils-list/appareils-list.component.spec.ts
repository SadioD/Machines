import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppareilsListComponent } from './appareils-list.component';

describe('AppareilsListComponent', () => {
  let component: AppareilsListComponent;
  let fixture: ComponentFixture<AppareilsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppareilsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppareilsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
