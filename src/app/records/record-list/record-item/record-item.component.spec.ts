import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordItemComponent } from './record-item.component';

describe('RecordItemComponent', () => {
  let component: RecordItemComponent;
  let fixture: ComponentFixture<RecordItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordItemComponent]
    });
    fixture = TestBed.createComponent(RecordItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
