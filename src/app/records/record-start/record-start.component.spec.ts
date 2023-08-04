import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordStartComponent } from './record-start.component';

describe('RecordStartComponent', () => {
  let component: RecordStartComponent;
  let fixture: ComponentFixture<RecordStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordStartComponent]
    });
    fixture = TestBed.createComponent(RecordStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
