import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForOhforComponent } from './for-ohfor.component';

describe('ForOhforComponent', () => {
  let component: ForOhforComponent;
  let fixture: ComponentFixture<ForOhforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForOhforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForOhforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
