import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingListPage } from './reading-list.page';

describe('ReadingListPage', () => {
  let component: ReadingListPage;
  let fixture: ComponentFixture<ReadingListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
