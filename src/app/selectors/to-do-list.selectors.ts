import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { ToDoListState } from '../reducers/to-do-list.reducer';


const toDoListState = (state: AppState) => state.toDoList;

export const allListsSelector = createSelector(
  toDoListState,
  (state: ToDoListState) => state.lists
);

export const addingNewListSelector = createSelector(
  toDoListState,
  (state: ToDoListState) => state.newListRequested
);

export const selectedListSelector = createSelector(
  toDoListState,
  (state: ToDoListState) => state.selectedList
);