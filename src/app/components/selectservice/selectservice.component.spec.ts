import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectserviceComponent } from './selectservice.component';

describe('SelectserviceComponent', () => {
  let component: SelectserviceComponent;
  let fixture: ComponentFixture<SelectserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectserviceComponent]
    });
    fixture = TestBed.createComponent(SelectserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
