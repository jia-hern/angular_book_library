import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderItemComponent } from './reader-item.component';

describe('ReaderItemComponent', () => {
  let component: ReaderItemComponent;
  let fixture: ComponentFixture<ReaderItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReaderItemComponent]
    });
    fixture = TestBed.createComponent(ReaderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
