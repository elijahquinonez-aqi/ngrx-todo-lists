import { createAction, props } from '@ngrx/store';
import { ToDoItem } from '../to-do-list/to-do-item.model';
import { ToDoList } from '../to-do-list/to-do-list.model';

export const addList = createAction('[ToDoList] Add List', props<ToDoList>());

export const editListName = createAction(
  '[ToDoList] Edit List Name',
  props<{ newName: string }>()
);

export const removeList = createAction('[ToDoList] Remove List');

export const newListRequested = createAction('[ToDoList] New List Requested');

export const addToDoItem = createAction(
  '[ToDoList] Add Item',
  props<ToDoItem>()
);
export const removeItem = createAction(
  '[ToDoList] Remove Item',
  props<ToDoItem>()
);
export const completeItem = createAction(
  '[ToDoList] Complete Item',
  props<ToDoItem>()
);
export const completeList = createAction('[ToDoList] Complete List');

export const selectList = createAction(
  '[ToDoList] Select List',
  props<ToDoList>()
);
