import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStartComponent } from './book-start.component';

describe('BookStartComponent', () => {
  let component: BookStartComponent;
  let fixture: ComponentFixture<BookStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookStartComponent]
    });
    fixture = TestBed.createComponent(BookStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
