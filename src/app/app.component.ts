import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  addList,
  addToDoItem,
  completeItem,
  completeList,
  editListName,
  newListRequested,
  selectList,
} from './actions/to-do-list.actions';
import { AppState } from './reducers';
import {
  allListsSelector,
  addingNewListSelector,
  selectedListSelector,
} from './selectors/to-do-list.selectors';
import { ToDoItem } from './to-do-list/to-do-item.model';
import { ToDoList } from './to-do-list/to-do-list.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  toDoListCollection$ = this.store.select(allListsSelector);
  addingNewList$ = this.store.select(addingNewListSelector);
  selectedList$ = this.store.select(selectedListSelector);
  newListNameChanged$ = new BehaviorSubject('');
  lastValueEmitted = true;
  isNewListNameUnique$ = combineLatest([
    this.newListNameChanged$,
    this.toDoListCollection$,
  ]).pipe(
    map(([newName, list]) => {
      if (list.map((l) => l.name).includes(newName)) return false;
      return true;
    })
  );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onNewListRequested() {
    this.store.dispatch(newListRequested());
  }

  onItemAddedToList(itemName: string) {
    this.store.dispatch(addToDoItem({ name: itemName, isComplete: false }));
  }

  onNewListNameChanged(name: string) {
    this.newListNameChanged$.next(name);
    this.store.dispatch(editListName({ newName: name }));
  }

  onSaveList(list: ToDoList) {
    this.store.dispatch(addList(list));
  }

  onListSelected(list: ToDoList) {
    this.store.dispatch(selectList(list));
  }

  onItemCompleted(item: ToDoItem) {
    this.store.dispatch(completeItem(item));
  }

  onListCompleted() {
    this.store.dispatch(completeList());
  }

}
