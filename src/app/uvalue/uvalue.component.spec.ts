import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UValueComponent } from './uvalue.component';

describe('UValueComponent', () => {
  let component: UValueComponent;
  let fixture: ComponentFixture<UValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
