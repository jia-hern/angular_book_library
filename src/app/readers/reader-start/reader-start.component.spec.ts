import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderStartComponent } from './reader-start.component';

describe('ReaderStartComponent', () => {
  let component: ReaderStartComponent;
  let fixture: ComponentFixture<ReaderStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReaderStartComponent],
    });
    fixture = TestBed.createComponent(ReaderStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
