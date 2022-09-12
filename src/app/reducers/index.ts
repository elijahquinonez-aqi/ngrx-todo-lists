import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { toDoListReducer, ToDoListState,  } from './to-do-list.reducer';


export interface AppState {
  toDoList: ToDoListState;
}

export const reducers: ActionReducerMap<AppState> = {
  toDoList: toDoListReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
