import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordEditComponent } from './record-edit.component';

describe('RecordEditComponent', () => {
  let component: RecordEditComponent;
  let fixture: ComponentFixture<RecordEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordEditComponent]
    });
    fixture = TestBed.createComponent(RecordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
