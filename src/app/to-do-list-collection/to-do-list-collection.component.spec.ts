import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListCollectionComponent } from './to-do-list-collection.component';

describe('ToDoListsComponent', () => {
  let component: ToDoListCollectionComponent;
  let fixture: ComponentFixture<ToDoListCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoListCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
