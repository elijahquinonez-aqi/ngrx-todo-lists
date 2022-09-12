import { createReducer, on } from '@ngrx/store';
import {
  newListRequested,
  addList,
  editListName,
  removeList,
  completeList,
  addToDoItem,
  removeItem,
  completeItem,
  selectList,
} from '../actions/to-do-list.actions';
import { ToDoItem } from '../to-do-list/to-do-item.model';
import { ToDoList } from '../to-do-list/to-do-list.model';

export const toDoListsFeatureKey = 'toDoLists';

export interface ToDoListState {
  lists: Array<ToDoList>;
  selectedList: ToDoList;
  newListRequested?: boolean;
}

export const initialState: ToDoListState = {
  lists: [],
  selectedList: new ToDoList(),
  newListRequested: true,
};

export const toDoListReducer = createReducer(
  initialState,
  on(newListRequested, (state) => ({
    lists: [...state.lists],
    selectedList: new ToDoList(),
    newListRequested: true,
  })),
  on(selectList, (state, list) => ({
    lists: [...state.lists],
    selectedList: list,
    newListRequested: false,
  })),
  on(addList, (state, newList) => {
    if (state.lists.findIndex((l) => l.name === newList.name) > -1)
      return state;
    return {
      lists: [...state.lists, newList],
      selectedList: newList,
      newListRequested: false,
    };
  }),
  on(editListName, (state, { newName }) => {
    const list = new ToDoList();
    list.name = newName;
    list.toDoItems = [...state.selectedList.toDoItems];
    return {
      lists: [...state.lists],
      selectedList: list,
      newListRequested: state.newListRequested,
    };
  }),
  on(removeList, (state) => {
    return {
      lists: state.lists.filter((l) => l !== state.selectedList),
      selectedList: state.lists[0],
      newListRequested: state.lists.length === 0,
    };
  }),
  on(completeList, (state) => {
    const completedItems = [...state.selectedList?.toDoItems];
    completedItems.forEach((i) => (i.isComplete = true));
    const selectedList = new ToDoList();
    selectedList.name = state.selectedList.name;
    selectedList.toDoItems = completedItems;
    const lists = [...state.lists];
    const i = state.lists.findIndex((l) => l.name === selectedList.name);
    if (i >= 0) lists.splice(i, 1, selectedList);
    return {
      lists,
      selectedList,
      newListRequested: false,
    };
  }),
  on(addToDoItem, (state, item) => {
    if (state.selectedList.toDoItems.includes(item)) return state;
    const selectedList = new ToDoList();
    selectedList.name = state.selectedList.name;
    selectedList.toDoItems = [...state.selectedList.toDoItems, item];
    let lists: ToDoList[] = [];
    if (state.lists.length) {
      lists = [...state.lists];
      const i = state.lists.findIndex((l) => l.name === selectedList.name);
      if (i >= 0) lists.splice(i, 1, selectedList);
    }
    return {
      lists,
      selectedList,
      newListRequested: state.newListRequested,
    };
  }),
  on(removeItem, (state, item) => {
    const selectedList = new ToDoList();
    selectedList.name = state.selectedList.name;
    selectedList.toDoItems = state.selectedList.toDoItems.filter(
      (i) => i.name !== item.name
    );
    let lists: ToDoList[] = [];
    if (state.lists.length) {
      lists = [...state.lists];
      const i = state.lists.findIndex((l) => l.name === selectedList.name);
      if (i >= 0) lists.splice(i, 1, selectedList);
    }
    return {
      lists,
      selectedList,
      newListRequested: state.newListRequested,
    };
  }),
  on(completeItem, (state, item) => {
    const selectedList = new ToDoList();
    selectedList.name = state.selectedList.name;
    selectedList.toDoItems = [];
    state.selectedList.toDoItems.forEach((i) => {
      const newItem: ToDoItem = {name: i.name, isComplete: i.name === item.name? true : i.isComplete }
      selectedList.toDoItems.push(newItem);
    });
    let lists: ToDoList[] = [];
    if (state.lists.length) {
      lists = [...state.lists];
      const i = state.lists.findIndex((l) => l.name === selectedList.name);
      if (i >= 0) lists.splice(i, 1, selectedList);
    }
    return {
      lists,
      selectedList,
      newListRequested: state.newListRequested,
    };
  })
);
