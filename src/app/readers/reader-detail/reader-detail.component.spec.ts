import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderDetailComponent } from './reader-detail.component';

describe('ReaderDetailComponent', () => {
  let component: ReaderDetailComponent;
  let fixture: ComponentFixture<ReaderDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReaderDetailComponent],
    });
    fixture = TestBed.createComponent(ReaderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
